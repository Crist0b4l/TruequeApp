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

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) {}

  ngOnInit() {
    const publicacionesGuardadas = localStorage.getItem('publicacionesPropias');
    if (publicacionesGuardadas) {
      this.publicacionesPropias = JSON.parse(publicacionesGuardadas);
      console.log('Publicaciones propias cargadas:', this.publicacionesPropias);
    } else {
      this.publicacionesPropias = [
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

      // guardar los ejemplos en localStorage
      localStorage.setItem(
        'publicacionesPropias',
        JSON.stringify(this.publicacionesPropias)
      );
      console.log('Ejemplos iniciales guardados en localStorage.');
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

      localStorage.setItem(
        'publicacionesPropias',
        JSON.stringify(this.publicacionesPropias) // guarda publicaciones en localStorage
      );
      console.log('Publicación guardada en localStorage:', data);
    }
  }


  async eliminarPublicacion(pub: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta publicación?',
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

            localStorage.setItem(
              'publicacionesPropias',
              JSON.stringify(this.publicacionesPropias)
            );

            console.log('Publicación eliminada:', pub);
          }
        }
      ]
    });

    await alert.present();
  }

  
}
