import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles: string[] = route.data?.['roles'] ?? [];
    const user = this.authService.getUser();
    if (!user) {
      return this.router.parseUrl('/login');
    }
    if (expectedRoles.length && !expectedRoles.includes(user.role)) {
      return this.router.parseUrl('/unauthorized');
    }
    return true;
  }
}
