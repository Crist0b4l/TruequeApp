import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {}

  get mostrarMenu(): boolean {
    return !this.router.url.includes('/login');
  }

  get esPerfil(): boolean {
    return this.router.url === '/perfil';
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActivo'); // Eliminar la sesión activa
    this.router.navigateByUrl('/login'); // Redirigir al login
  }
}
