import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationExtras,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrxs/auth/auth.state';
import * as AuthActions from '../ngrxs/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'client';
  isLoginPage = false;

  mainClass = ['login-scaffold'];

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState }>,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url.includes('login');
      }
    });
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        this.store.dispatch(AuthActions.storeIdToken({ idToken: token.token }));
      } else {
        console.log('User is not sign in');
      }
    });
  }
}
