import { Component, HostListener } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule],
})
export class SearchBarComponent {
  showDropdown = false;
  showSearchBar = false;

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.showDropdown = input.value.trim().length > 0;
  }
}
