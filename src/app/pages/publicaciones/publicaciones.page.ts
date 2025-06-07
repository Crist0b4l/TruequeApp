import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormPublicacionPage } from '../form-publicacion/form-publicacion.page';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
  standalone: false,
})
export class PublicacionesPage {
  publicacionesPropias = [
    {
      tipo: 'Ofrece',
      categoria: 'Hogar',
      titulo: 'Silla de escritorio',
      descripcion: 'Silla negra, con respaldo alto. Poco uso.',
      intercambio: 'Lámpara o audífonos',
      usuario: 'Tú',
      comuna: 'Independencia',
      imagen: 'assets/img/silla.jpg'
    },
    {
      tipo: 'Busca',
      categoria: 'Tecnología',
      titulo: 'Cargador USB-C',
      descripcion: 'Necesito cargador rápido para celular Samsung.',
      intercambio: 'Audífonos bluetooth usados',
      usuario: 'Tú',
      comuna: 'Providencia',
      imagen: 'assets/img/cargador.jpeg'
    }
  ];

  constructor(private modalCtrl: ModalController) {}

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: FormPublicacionPage
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.publicacionesPropias.unshift(data);
    }
  }
}
