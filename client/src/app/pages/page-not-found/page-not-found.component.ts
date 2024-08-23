import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}
  navigateBack(): void {
    this.router.navigate(['/']).then(() => {});
  }
}
