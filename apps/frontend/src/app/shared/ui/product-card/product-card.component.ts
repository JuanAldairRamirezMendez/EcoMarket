import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() name = '';
  @Input() price: number | string = 0;
  @Input() imageUrl = '';
  @Input() rating: number = 0;
  @Input() seller: string = '';
  @Input() discount?: number; // porcentaje, ej: 20 significa -20%

  stars = [1,2,3,4,5];

  isFilled(i: number) {
    return i <= Math.round(this.rating || 0);
  }

  discountedPrice(): number | null {
    const p = typeof this.price === 'string' ? Number(this.price) : this.price;
    if (isNaN(p as number)) return null;
    if (this.discount && this.discount > 0) {
      return Number((p as number) * (1 - this.discount / 100));
    }
    return null;
  }
}
