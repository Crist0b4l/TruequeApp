import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Publicacion } from '../../models/publicacion.model';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.page.html',
  styleUrls: ['./modal-publicacion.page.scss'],
  standalone: false,
})
export class ModalPublicacionPage implements OnInit {
  publicacion!: Publicacion;

  constructor(
    private modalCtrl: ModalController, 
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.publicacion = this.navParams.get('publicacion');
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async responder() {
    const alert = await this.alertCtrl.create({
      header: 'Enviar mensaje',
      inputs: [
        {
          name: 'mensaje',
          type: 'textarea',
          placeholder: 'Escribe tu mensaje aquí...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            const mensaje = (data.mensaje || '').trim();

            if (!mensaje) {
            
              const errorToast = await this.toastCtrl.create({
                message: 'Debes escribir un mensaje.',
                duration: 2000,
                color: 'danger',
                position: 'bottom'
              });
              await errorToast.present();

              return false;
            }

            console.log('Mensaje enviado:', mensaje);

            const toast = await this.toastCtrl.create({
              message: 'Mensaje enviado.',
              duration: 2000,
              color: 'success',
              position: 'bottom'
            });
            await toast.present();

            this.modalCtrl.dismiss();
            return true;
          }
        }
      ]
    });

  await alert.present();
}

}
