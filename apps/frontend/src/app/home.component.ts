import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './shared/ui/product-card/product-card.component';
import { FilterSidebarComponent, FilterState } from './shared/ui/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FilterSidebarComponent],
  template: `
    <section class="p-6 space-y-6">
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Productos destacados</h1>
        <button class="md:hidden px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted/50" (click)="showFilters = true">Filtros</button>
      </header>

      <div class="flex gap-2 flex-wrap">
        <button class="px-3 py-1.5 rounded-full border border-border hover:bg-muted/50" [ngClass]="{'bg-accent text-foreground': selectedChip==='Frutas'}" (click)="quickCategory('Frutas')">Frutas</button>
        <button class="px-3 py-1.5 rounded-full border border-border hover:bg-muted/50" [ngClass]="{'bg-accent text-foreground': selectedChip==='Verduras'}" (click)="quickCategory('Verduras')">Verduras</button>
        <button class="px-3 py-1.5 rounded-full border border-border hover:bg-muted/50" [ngClass]="{'bg-accent text-foreground': selectedChip==='Panadería'}" (click)="quickCategory('Panadería')">Panadería</button>
        <button class="px-3 py-1.5 rounded-full border border-border hover:bg-muted/50" [ngClass]="{'bg-accent text-foreground': selectedChip==='Lácteos'}" (click)="quickCategory('Lácteos')">Lácteos</button>
        <button class="px-3 py-1.5 rounded-full border border-border hover:bg-muted/50" [ngClass]="{'bg-accent text-foreground': selectedChip==='Café'}" (click)="quickCategory('Café')">Café</button>
      </div>

      <div class="flex gap-6">
        <app-filter-sidebar class="hidden md:block" (apply)="onApplyFilters($event)" />

        <div class="grid gap-4 flex-1" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));">
          <app-product-card
            *ngFor="let p of filtered"
            [name]="p.name"
            [price]="p.price"
            [imageUrl]="p.imageUrl"
            [rating]="p.rating"
            [seller]="p.seller"
            [discount]="p.discount"
          />
        </div>
      </div>

      <!-- Drawer de filtros para móvil -->
      <div *ngIf="showFilters" class="fixed inset-0 z-50 flex">
        <div class="flex-1 bg-black/30" (click)="showFilters=false"></div>
        <div class="w-72 max-w-[85%] h-full bg-card text-foreground border-l border-border shadow-xl p-4 overflow-y-auto">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-lg font-medium">Filtros</h2>
            <button class="px-2 py-1 rounded border border-border" (click)="showFilters=false">Cerrar</button>
          </div>
          <app-filter-sidebar (apply)="onApplyFilters($event); showFilters=false"></app-filter-sidebar>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  products = [
    { name: 'Ensalada orgánica fresca', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop', rating: 4.6, seller: 'EcoFarms', discount: 15 },
    { name: 'Manzanas rojas', price: 3.49, imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop', rating: 4.8, seller: 'Huerto Feliz' },
    { name: 'Pan integral artesanal', price: 2.99, imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=800&auto=format&fit=crop', rating: 4.3, seller: 'Panadería Verde', discount: 20 },
    { name: 'Queso orgánico', price: 7.5, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', rating: 4.7, seller: 'Lácteos Eco' },
    { name: 'Tomates cherry', price: 2.5, imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop', rating: 4.4, seller: 'Huerto Feliz' },
    { name: 'Café orgánico', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop', rating: 4.9, seller: 'Cafetal Bio', discount: 10 }
  ];

  filtered = [...this.products];
  showFilters = false;
  selectedChip: string | null = null;

  onApplyFilters(f: FilterState) {
    this.filtered = this.products.filter(p => {
      const okCategory = f.categories.length ? f.categories.some(c => p.name.toLowerCase().includes(c.toLowerCase())) : true;
      const price = Number(p.price);
      const okMin = f.priceMin != null ? price >= (f.priceMin ?? 0) : true;
      const okMax = f.priceMax != null ? price <= (f.priceMax ?? Infinity) : true;
      const okRating = f.rating != null ? (p.rating ?? 0) >= (f.rating ?? 0) : true;
      return okCategory && okMin && okMax && okRating;
    });
  }

  quickCategory(term: string) {
    if (this.selectedChip === term) {
      this.selectedChip = null;
      this.filtered = [...this.products];
      return;
    }
    this.selectedChip = term;
    this.filtered = this.products.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
  }
}
