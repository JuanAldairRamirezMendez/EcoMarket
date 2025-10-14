import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  role: string = '';

  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.role = user?.role || '';
  }

  toggleDark() {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.document.documentElement;
    el.classList.toggle('dark');
  }
}
