import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ModalPublicacionPage } from '../pages/modal-publicacion/modal-publicacion.page';
import { Publicacion } from '../models/publicacion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  publicaciones: Publicacion[] = [
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

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  async verPublicacion(publicacion: Publicacion) {
    const modal = await this.modalCtrl.create({
      component: ModalPublicacionPage,
      componentProps: {
        publicacion: publicacion
      }
    });
    await modal.present();
  }

  async usarMiUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const comuna = await this.obtenerComunaDesdeCoords(lat, lon);

      if (comuna) {
        this.presentToast(`¡Listo! hemos detectado que estás en ${comuna}. Mostrando publicaciones cercanas...`);
      } else {
        this.presentToast('No se pudo determinar tu comuna. Mostrando todas las publicaciones.');
      }

      console.log('Ubicación actual:', lat, lon);

      // a futuro llamar un filtro de publicaciones cercanas
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      this.presentToast('No se pudo obtener tu ubicación');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'bottom'
    });
    await toast.present();
  }

  async obtenerComunaDesdeCoords(lat: number, lon: number): Promise<string | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const comuna = data.address?.city || data.address?.town || data.address?.village;

      console.log('Respuesta API reverse geocoding:', data);
      return comuna || null;
    } catch (error) {
      console.error('Error en reverse geocoding:', error);
      return null;
    }
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
