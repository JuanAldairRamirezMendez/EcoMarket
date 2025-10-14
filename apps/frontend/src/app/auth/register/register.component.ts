import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Registro</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="email" placeholder="Email" formControlName="email" />
      <input type="password" placeholder="Password" formControlName="password" />
      <input type="text" placeholder="Nombre" formControlName="firstName" />
      <input type="text" placeholder="Apellido" formControlName="lastName" />
      <button type="submit" [disabled]="form.invalid">Crear cuenta</button>
    </form>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.auth.signup(this.form.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
    });
  }
}
