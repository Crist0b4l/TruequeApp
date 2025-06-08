import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router: Router, private alertCtrl: AlertController) {}

  irACrearPublicacion() {
    this.router.navigate(['/tabs/publicaciones']);
  }

  async abrirBusqueda() {
    const alert = await this.alertCtrl.create({
      header: 'Buscar publicación',
      inputs: [
        {
          name: 'termino',
          type: 'text',
          placeholder: 'Ej: bicicleta, libros, tecnología...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Buscar',
          handler: (data) => {
            console.log('Término buscado:', data.termino);
            // En el futuro aquí se podrá aplicar la lógica para filtrar
          }
        }
      ]
    });

    await alert.present();
  }
}
