import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token?: string; // backend actual devuelve { token }
  access_token?: string; // compatibilidad si cambiamos el nombre
  user?: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  signup(body: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/signup`, body).pipe(
      tap((res) => this.persistToken(res))
    );
  }

  login(body: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, body).pipe(
      tap((res) => this.persistToken(res))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private persistToken(res: AuthResponse) {
    const token = res.token || res.access_token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }
}
