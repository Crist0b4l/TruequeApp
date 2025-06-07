import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  publicaciones = [
    {
      tipo: 'Ofrece',
      categoria: 'Juguetes',
      titulo: 'Bicicleta Infantil',
      descripcion: 'Bicicleta aro 20 en excelente estado.',
      intercambio: 'Juguetes educativos',
      usuario: 'Juan Pérez',
      comuna: 'Maipú',
      imagen: 'assets/img/bicicleta.jpg'
    },
    {
      tipo: 'Busca',
      categoria: 'Libros',
      titulo: 'Libro de Historia',
      descripcion: 'Necesito libro de historia 3º medio.',
      intercambio: 'Mochila escolar',
      usuario: 'María Soto',
      comuna: 'Ñuñoa',
      imagen: 'assets/img/libro.jpg'
    },
    {
      tipo: 'Ofrece',
      categoria: 'Electrodomésticos',
      titulo: 'Lámpara de escritorio',
      descripcion: 'Moderna, LED, color blanco.',
      intercambio: 'Cuaderno o lápices',
      usuario: 'Carlos Díaz',
      comuna: 'La Florida',
      imagen: 'assets/img/lampara.jpg'
    }
  ];

  constructor(private router: Router) {}

  irACrearPublicacion() {
    this.router.navigate(['/tabs/publicaciones']);
  }
}
