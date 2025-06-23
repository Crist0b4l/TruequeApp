import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: false,
})
export class NotFoundPage {

  constructor(private router: Router) {}

  goHome() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    if (usuarioActivo) {
      this.router.navigate(['/tabs/home']); // si hay sesión activa
    } else {
      this.router.navigate(['/login']); // si no hay sesión
    }
  }
}
