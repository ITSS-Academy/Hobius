import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { JWTTokenService } from '../../../services/jwttoken.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isStaticUser = false;

  links = [
    {
      name: 'Admin',
      icon: 'shield_person',
      routeLink: '/admin',
      isActive: false,
    },
    { name: 'Trang chủ', icon: 'home', routeLink: '/home', isActive: true },
    {
      name: 'Hồ sơ',
      icon: 'person',
      routeLink: '/profile',
      isActive: false,
    },
  ];

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>,
    private jwtTokenService: JWTTokenService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'isStaticUser').subscribe((isStaticUser) => {
        this.isStaticUser = isStaticUser;
      }),
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          // console.log(event);
          this.links.forEach((link) => {
            link.isActive = this.router.url.includes(link.routeLink);
          });
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  navigate(index: number) {
    if (
      this.links[index].routeLink === '/admin' ||
      this.links[index].routeLink === '/profile'
    ) {
      if (this.jwtTokenService.jwtToken != '') {
        this.jwtTokenService.checkTokenExpired();
        if (this.jwtTokenService.isTokenExpired()) {
          return;
        }
      }
    }
    this.router.navigate([this.links[index].routeLink]).then(() => {});
  }
}
