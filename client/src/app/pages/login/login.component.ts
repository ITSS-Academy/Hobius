import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [SharedModule, MaterialModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoadingSignIn = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'loading').subscribe((loading) => {
        this.isLoadingSignIn = loading;
      }),
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken != '') {
          this.router.navigate(['/home']).then();
        }
      }),
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle form submission
      console.log(this.loginForm.value);
    }
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  signInWithStaticUser() {
    this.store.dispatch(
      AuthActions.signInWithStaticUser({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }),
    );
  }
}
