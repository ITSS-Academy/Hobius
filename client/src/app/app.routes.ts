import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import * as RoleGuards from './guards/role.guard';
import * as AuthGuards from './guards/auth.guard';

export const routes: Routes = [
  // redirect to `home`
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.route').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'categories/:type',
    loadChildren: () =>
      import('./pages/categories/categories.route').then(
        (m) => m.CATEGORIES_ROUTES,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.route').then((m) => m.PROFILE_ROUTES),
    canActivate: [AuthGuards.canActivateProfile],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.route').then((m) => m.ADMIN_ROUTES),
    canActivate: [RoleGuards.canActivateAdmin],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.route').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'ebook-info/:id',
    loadChildren: () =>
      import('./pages/ebook-info/ebook-info.route').then(
        (m) => m.EBOOK_INFO_ROUTES,
      ),
  },
  {
    path: 'reading',
    loadChildren: () =>
      import('./pages/reading/reading.route').then((m) => m.READING_ROUTES),
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
