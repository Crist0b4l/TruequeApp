import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormPublicacionPage } from '../form-publicacion/form-publicacion.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
  standalone: false,
})
export class PublicacionesPage {

  publicacionesPropias: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // cargar publicaciones desde localstorage
    const publicacionesGuardadas = localStorage.getItem('publicacionesPropias');
    if (publicacionesGuardadas) {
      this.publicacionesPropias = JSON.parse(publicacionesGuardadas);
      console.log('publicaciones propias cargadas:', this.publicacionesPropias);
    } else {
      this.publicacionesPropias = [];
    }
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: FormPublicacionPage
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.publicacionesPropias.unshift(data);

      // guardar publicaciones en localstorage
      localStorage.setItem(
        'publicacionesPropias',
        JSON.stringify(this.publicacionesPropias)
      );
      console.log('publicacion guardada en localstorage:', data);
    }
  }

  async eliminarPublicacion(pub: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminacion',
      message: '¿estas seguro de que quieres eliminar esta publicacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.publicacionesPropias = this.publicacionesPropias.filter(
              p => p !== pub
            );

            // actualizar localstorage despues de eliminar
            localStorage.setItem(
              'publicacionesPropias',
              JSON.stringify(this.publicacionesPropias)
            );

            console.log('publicacion eliminada:', pub);
          }
        }
      ]
    });

    await alert.present();
  }

}
