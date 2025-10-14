import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        const token = (res as any)?.access_token ?? (res as any)?.token;
        if (token) {
          this.authService.saveToken(token);
        }
        // Navega a ruta protegida (usamos '/' que ya está protegida por AuthGuard)
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas';
        this.loading = false;
      }
    });
  }
}
