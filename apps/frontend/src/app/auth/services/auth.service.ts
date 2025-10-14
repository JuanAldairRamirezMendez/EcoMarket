import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token?: string;
  token?: string;
  role?: string;
  user?: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/signup`, data).pipe(
      tap((res) => this.persistToken(res))
    );
  }

  // Alias más amigable para el flujo de registro desde el front
  register(data: { name: string; email: string; password: string }): Observable<LoginResponse> {
    // El backend espera firstName/lastName; si solo tenemos name, lo enviamos como firstName
    const payload: any = {
      email: data.email,
      password: data.password,
      firstName: data.name,
      lastName: '',
    };
    return this.signup(payload);
  }

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => this.persistToken(res))
    );
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('token');
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payloadPart = token.split('.')[1];
      const decoded = JSON.parse(typeof atob === 'function' ? atob(payloadPart) : Buffer.from(payloadPart, 'base64').toString('utf-8'));
      return decoded; // { sub, email, role, iat, exp, ... }
    } catch (e) {
      return null;
    }
  }

  private persistToken(res: LoginResponse) {
    const token = res.token || res.access_token;
    if (token) this.saveToken(token);
  }
}
