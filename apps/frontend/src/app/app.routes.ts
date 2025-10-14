import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { HomeComponent } from './home.component';
import { UnauthorizedComponent } from './unauthorized.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
		{ path: 'unauthorized', component: UnauthorizedComponent },
		{ path: 'admin', canActivate: [RoleGuard], data: { roles: ['ADMIN'] }, loadComponent: () => import('./admin.component').then(m => m.AdminComponent) },
		{ path: 'seller', canActivate: [RoleGuard], data: { roles: ['SELLER'] }, loadComponent: () => import('./seller.component').then(m => m.SellerComponent) },
	{
		path: '',
		canActivate: [AuthGuard],
			children: [
					{ path: '', pathMatch: 'full', component: HomeComponent },
			],
	},
	{ path: '**', redirectTo: '' },
];
