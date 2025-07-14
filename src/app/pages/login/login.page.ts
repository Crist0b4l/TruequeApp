// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AlertController, NavController } from '@ionic/angular';
// import { DbserviceService } from 'src/app/services/dbservice.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
//   standalone: false,
// })
// export class LoginPage {
//   usuario: string = '';
//   password: string = '';

//   constructor(
//     private router: Router,
//     private alertController: AlertController,
//     private navCtrl: NavController,
//     private dbService: DbserviceService
//   ) {}

//   async login() {
//   if (!this.usuario || !this.password) {
//     return this.presentAlert('Campos vacíos', 'Por favor, completa todos los campos.');
//   }

//   try {
//     const valido = await this.dbService.validarLogin(this.usuario, this.password);

//     if (valido) {
//       localStorage.setItem('usuarioActivo', this.usuario);
//       this.navCtrl.navigateForward(['tabs/home'], {
//         queryParams: { usuario: this.usuario },
//       });
//     } else {
//       this.presentAlert('Acceso denegado', 'Usuario o contraseña incorrectos.');
//     }
//   } catch (error: any) {
//     this.presentAlert('Error', 'Ocurrió un problema al acceder a la base de datos.');
//   }
// }


//   async presentAlert(titulo: string, mensaje: string) {
//     const alert = await this.alertController.create({
//       header: titulo,
//       message: mensaje,
//       buttons: ['OK'],
//     });

//     await alert.present();
//   }
//   //Probar pagina inexistente
//   irARutaInexistente() {
//     this.router.navigate(['/ruta-que-no-existe']);
//   }
// }

//Comentado para correr prueba unitaria