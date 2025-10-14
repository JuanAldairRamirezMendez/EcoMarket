import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  query = '';
  showSearch = false;

  onSearch(e: Event) {
    e.preventDefault();
    // Aquí podrías navegar a /search?q=...
    // Por ahora, solo hacemos console.log
    console.log('Buscar:', this.query);
    this.showSearch = false;
  }
}
