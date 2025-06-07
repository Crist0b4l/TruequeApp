import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async login() {
    if (!this.usuario || !this.password) {
      return this.presentAlert('Campos vacíos', 'Por favor, completa todos los campos.');
    }

    if (this.usuario.length < 3 || this.usuario.length > 10) {
      return this.presentAlert('Usuario inválido', 'Debe tener entre 3 y 10 caracteres.');
    }

    if (!/^\d{4}$/.test(this.password)) {
      return this.presentAlert('Contraseña inválida', 'Debe contener exactamente 4 dígitos numéricos.');
    }
    //navegar a la página de inicio
    this.router.navigateByUrl('/tabs/home');
  }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
