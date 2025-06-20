import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const sesionActiva = !!localStorage.getItem('usuarioActivo'); // Acepta cualquier valor no vacío
    if (!sesionActiva) {
      this.router.navigate(['/login']); // Redirigir al login si no hay sesión activa
      return false;
    }
    return true; // Permitir el acceso si hay sesión activa
  }
}
