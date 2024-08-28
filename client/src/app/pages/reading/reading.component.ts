import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ExamplePdfViewerComponent } from '../../components/example-pdf-viewer/example-pdf-viewer.component';
import { Store } from '@ngrx/store';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import { combineLatest, Subscription } from 'rxjs';
import { UserEbookState } from '../../../ngrxs/user-ebook/user-ebook.state';
import * as UserEbookActions from '../../../ngrxs/user-ebook/user-ebook.actions';
import * as EbookActions from '../../../ngrxs/ebook/ebook.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { EbookModel } from '../../../models/ebook.model';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [SharedModule, MaterialModule, ExamplePdfViewerComponent],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent implements OnInit, OnDestroy {
  page = 1;
  pdfUrl: string = '';
  subscriptions: Subscription[] = [];
  isLogin = false;
  selectedEbook: EbookModel | null = null;

  isLoadingCurrentReading$ = this.store.select(
    'user_ebook',
    'isLoadingCurrentReading',
  );
  selectedEbook$ = this.store.select('ebook', 'selectedEbook');

  idToken$ = this.store.select('auth', 'idToken');

  isCreating$ = this.store.select('user_ebook', 'isCreating');

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      ebook: EbookState;
      user_ebook: UserEbookState;
      auth: AuthState;
    }>,
    private _matSnackbar: MatSnackBar,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.subscriptions.push(
      combineLatest([this.selectedEbook$, this.idToken$]).subscribe(
        ([ebook, idToken]) => {
          if (ebook && idToken != '') {
            this.isLogin = true;
            this.selectedEbook = ebook;
            this.store.dispatch(
              UserEbookActions.findOneByEbookIdAndUserId({
                ebookId: ebook.id,
              }),
            );
            this.pdfUrl = ebook.pdf;
            console.log(this.pdfUrl);
          } else {
            if (!ebook) {
              this.store.dispatch(EbookActions.findOne({ id }));
            }
          }
        },
      ),
      this.store
        .select('user_ebook', 'currentReading')
        .subscribe((userEbook) => {
          if (userEbook) {
            console.log(userEbook);
          }
        }),
      this.store
        .select('user_ebook', 'errorCurrentReading')
        .subscribe((val) => {
          if (val) {
            console.log(val);
            if (val.error.message == 'User ebook not found') {
              if (this.selectedEbook) {
                this.store.dispatch(
                  UserEbookActions.create({
                    userEbook: {
                      ebook: this.selectedEbook.id,
                    },
                  }),
                );
              } else {
                this._matSnackbar.open(
                  'Đã có lỗi xảy ra trong quá trình tải',
                  'Đóng',
                );
              }
            }
          }
        }),
    );
  }
}
