import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {
  usuario = {
    nombre: 'Usuario',
    comuna: 'Ñuñoa',
    imagen: 'assets/img/usuario.png',
  };

  constructor(private router: Router) {}

  cerrarSesion() {
    this.router.navigateByUrl('/login');
  }
}
