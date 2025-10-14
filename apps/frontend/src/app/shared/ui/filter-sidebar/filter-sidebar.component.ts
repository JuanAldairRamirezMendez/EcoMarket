import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface FilterState {
  categories: string[];
  priceMin?: number | null;
  priceMax?: number | null;
  rating?: number | null;
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html'
})
export class FilterSidebarComponent {
  @Input() categories: string[] = ['Frutas', 'Verduras', 'Panadería', 'Lácteos', 'Café'];
  @Output() apply = new EventEmitter<FilterState>();

  state: FilterState = {
    categories: [],
    priceMin: null,
    priceMax: null,
    rating: null,
  };

  toggleCategory(cat: string, checked: boolean) {
    if (checked) {
      if (!this.state.categories.includes(cat)) this.state.categories.push(cat);
    } else {
      this.state.categories = this.state.categories.filter(c => c !== cat);
    }
  }

  setRating(r: number) {
    this.state.rating = r;
  }

  onApply() {
    this.apply.emit(this.state);
  }
}
