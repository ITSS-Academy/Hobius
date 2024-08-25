import {
  AfterViewInit,
  Component,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { EbookModel } from '../../../models/ebook.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddEbookFormDialogComponent } from './components/add-ebook-form-dialog/add-ebook-form-dialog.component';
import { EditEbookFormDialogComponent } from './components/edit-ebook-form-dialog/edit-ebook-form-dialog.component';
import { Subject, Subscription } from 'rxjs';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import { Store } from '@ngrx/store';
import * as EbookActions from '../../../ngrxs/ebook/ebook.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JWTTokenService } from '../../../services/jwttoken.service';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `Trang đầu`;
  itemsPerPageLabel = `Số ebook mỗi trang:`;
  lastPageLabel = `Trang cuối`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Trang kế';
  previousPageLabel = 'Trang trước';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Trang 1 trên 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Trang ${page + 1} trên ${amountPages}`;
  }
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class AdminComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  //table
  displayedColumns: string[] = [
    'select',
    // 'id',
    'image',
    'title',
    'author',
    'detail',
    'view',
    'like',
    'categories',
  ];
  dataSource: MatTableDataSource<EbookModel>;
  selection = new SelectionModel<EbookModel>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ebooks: EbookModel[] = [];
  isLoadingEbooks$ = this.store.select('ebook', 'isLoadingEbooks');
  isCreatingEbook$ = this.store.select('ebook', 'isCreatingEbook');
  isUpdatingEbook$ = this.store.select('ebook', 'isUpdatingEbook');

  //dialog
  readonly dialog = inject(MatDialog);
  readonly _snackBar = inject(MatSnackBar);

  constructor(
    // private cardService: CardService,
    private store: Store<{ ebook: EbookState }>,
    private jwtTokenService: JWTTokenService,
  ) {
    // Create 100 ebooks
    // this.ebooks = Array.from({ length: 10 }, (_, k) =>
    //   this.cardService.createNewEbook(k + 1),
    // );

    this.store.dispatch(EbookActions.findAll());

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.ebooks);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('ebook', 'ebooks').subscribe((val) => {
        this.ebooks = val;
        this.initTable();
      }),
      this.store.select('ebook', 'isLoadingEbooksError').subscribe((val) => {
        if (val != null) {
          this._snackBar.open('Đã có lỗi xảy ra trong quá trình tải', 'Đóng', {
            duration: 2000,
          });
        }
      }),
      this.store.select('ebook', 'isCreatingEbookSuccess').subscribe((val) => {
        if (val) {
          this._snackBar.open('Tạo ebook thành công', 'Đóng', {
            duration: 2000,
          });
          this.store.dispatch(EbookActions.findAll());
        }
      }),
      this.store.select('ebook', 'isCreatingEbookError').subscribe((val) => {
        if (val) {
          this._snackBar.open('Tạo ebook thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
      this.store.select('ebook', 'isUpdatingEbookSuccess').subscribe((val) => {
        if (val) {
          this._snackBar.open('Cập nhật ebook thành công', 'Đóng', {
            duration: 2000,
          });
          this.store.dispatch(EbookActions.findAll());
        }
      }),
      this.store.select('ebook', 'isUpdatingEbookError').subscribe((val) => {
        if (val) {
          this._snackBar.open('Cập nhật ebook thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EbookModel): string {
    if (!row) {
      return `${this.selection.hasValue() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id) + 1}`;
  }

  toggle(row: EbookModel) {
    if (this.selection.isSelected(row)) {
      // console.log(row);
      this.selection.deselect(row);
    } else {
      this.selection.clear(); // Clear all selections
      this.selection.toggle(row); // Select the clicked row
    }
    //log the checked row
    // console.log(this.selection.selected);
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.ebooks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateEbookDialog() {
    const dialogRef = this.dialog.open(AddEbookFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newEbook: EbookModel = {
          ...result,
          like: 0,
          view: 0,
          publishedDate: new Date().toDateString(),
        };
        // this.reInitTable(newEbook);
        console.log(newEbook);
        this.store.dispatch(EbookActions.create({ ebook: newEbook }));
      }
    });
  }

  openEditEbookDialog() {
    const dialogRef = this.dialog.open(EditEbookFormDialogComponent, {
      data: this.selection.selected[0],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let updatedEbook: EbookModel = {
          ...result,
          like: this.selection.selected[0].like,
          view: this.selection.selected[0].view,
        };
        console.log(updatedEbook);
        this.store.dispatch(
          EbookActions.update({
            id: this.selection.selected[0].id,
            ebook: updatedEbook,
          }),
        );
      }
    });
  }

  isRefreshing = false;

  reload() {
    if (this.jwtTokenService.isTokenExpired()) {
      this.jwtTokenService.alertTokenExpired();
    } else {
      if (this.isRefreshing) {
        this._snackBar.open('Vui lòng không spam!!!', 'Đóng', {
          duration: 2000,
        });
        return;
      }
      this.isRefreshing = true;
      this.store.dispatch(EbookActions.findAll());
      // Perform the refresh operation here
      setTimeout(() => {
        this.isRefreshing = false;
      }, 2000); // Re-enable the button after 2 seconds
    }
  }
}
