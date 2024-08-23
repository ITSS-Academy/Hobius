import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrxs/auth/auth.state';
import * as AuthActions from '../ngrxs/auth/auth.actions';
import * as UserActions from '../ngrxs/user/user.actions';
import { combineLatest } from 'rxjs';
import { UserState } from '../ngrxs/user/user.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Hobius';
  isLoginPage = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        this.store.dispatch(AuthActions.storeIdToken({ idToken: token.token }));
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url.includes('login');
      }
    });
    this.store.select('auth', 'idToken').subscribe((val) => {
      if (val != '') {
        this.store.dispatch(UserActions.getById());
      }
    });
    this.store.select('user', 'isGettingError').subscribe((val) => {
      if (val == 'User not found') {
        this.store.dispatch(UserActions.create());
      }
    });
    this.store.select('user', 'isCreatingSuccess').subscribe((val) => {
      if (val) {
        this.store.dispatch(UserActions.getById());
      }
    });
  }
}
