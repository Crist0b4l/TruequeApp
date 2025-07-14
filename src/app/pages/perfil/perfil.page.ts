// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DbserviceService } from 'src/app/services/dbservice.service';
// import { ToastController } from '@ionic/angular';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// @Component({
//   selector: 'app-perfil',
//   templateUrl: './perfil.page.html',
//   styleUrls: ['./perfil.page.scss'],
//   standalone: false,
// })
// export class PerfilPage implements OnInit {
//   modoEdicion: boolean = false;


//   usuarioDB: any = null;

//   nuevoUsuario: string = '';
//   nuevaPassword: string = '';

//   capturedImage?: string;

//   constructor(
//     private router: Router,
//     private dbService: DbserviceService,
//     private toastController: ToastController
//   ) {}

//   get usuarioInvalido(): boolean {
//   return (
//     this.nuevoUsuario !== '' &&
//     (this.nuevoUsuario.length < 4 || this.nuevoUsuario.length > 10)
//   );
// }

// get passwordInvalida(): boolean {
//   return this.nuevaPassword !== '' && !/^\d{4}$/.test(this.nuevaPassword);
// }

// validacionesPerfil(): boolean {
//   if (this.usuarioInvalido) {
//     this.presentToast('El nombre de usuario debe tener entre 4 y 10 caracteres');
//     return false;
//   }

//   if (this.passwordInvalida) {
//     this.presentToast('La contraseña debe tener exactamente 4 números');
//     return false;
//   }

//   return true;
// }


//   async ngOnInit() {
//     const usuarioActivo = localStorage.getItem('usuarioActivo');
//     if (usuarioActivo) {
//       this.usuarioDB = await this.dbService.obtenerUsuario(usuarioActivo);
//       this.nuevoUsuario = this.usuarioDB.usuario;
//       this.nuevaPassword = this.usuarioDB.password;
//     }
//     const fotoGuardada = localStorage.getItem('fotoPerfil');
//     if (fotoGuardada) {
//       this.capturedImage = fotoGuardada; // Carga la imagen guardada
//     }
//   }

//   cerrarSesion() {
//     localStorage.removeItem('usuarioActivo');
//     this.router.navigateByUrl('/login');
//   }

//   async actualizarPerfil() {
//     if (!this.validacionesPerfil()) return;

//     try {
//       await this.dbService.actualizarUsuario(
//         this.usuarioDB.usuario,
//         this.nuevoUsuario,
//         this.nuevaPassword
//       );
//       localStorage.setItem('usuarioActivo', this.nuevoUsuario);
//       this.usuarioDB.usuario = this.nuevoUsuario;
//       this.presentToast('Datos actualizados correctamente');
//       this.modoEdicion = false;  // Vuelve a modo vista
//     } catch (error: any) {
//       this.presentToast('Error al actualizar: ' + error.message);
//     }
//   }


//   async presentToast(message: string) {
//     const toast = await this.toastController.create({
//       message,
//       duration: 2000,
//       position: 'bottom',
//     });
//     await toast.present();
//   }

//   cancelarEdicion() {
//     this.modoEdicion = false;
//     this.nuevoUsuario = this.usuarioDB.usuario;
//     this.nuevaPassword = this.usuarioDB.password;
//   }


//   async captureImage() {
//     try {
//       const image = await Camera.getPhoto({
//         quality: 90,
//         allowEditing: false,
//         resultType: CameraResultType.DataUrl,
//         source: CameraSource.Prompt, // Permite al usuario elegir entre galería o cámara
//       });
//       this.capturedImage = image.dataUrl; // Almacena la imagen capturada

//       if (this.capturedImage) {
//         localStorage.setItem('fotoPerfil', this.capturedImage);
//       }
//     } catch (error: any) {
//       if (error && error.message && error.message.includes('cancel')) {
//         console.log('Captura de imagen cancelada por el usuario');
//         return;
//     }
//       console.error('Error al capturar imagen:', error);
//       this.presentToast('Error al capturar imagen: ' + error.message);
//     }
//   }
// }
