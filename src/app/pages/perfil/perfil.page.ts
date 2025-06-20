import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  usuarioDB: any = null;

  nuevoUsuario: string = '';
  nuevaPassword: string = '';

  constructor(
    private router: Router,
    private dbService: DbserviceService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    if (usuarioActivo) {
      this.usuarioDB = await this.dbService.obtenerUsuario(usuarioActivo);
      this.nuevoUsuario = this.usuarioDB.usuario;
      this.nuevaPassword = this.usuarioDB.password;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    this.router.navigateByUrl('/login');
  }

  async actualizarPerfil() {
    try {
      await this.dbService.actualizarUsuario(
        this.usuarioDB.usuario,
        this.nuevoUsuario,
        this.nuevaPassword
      );
      localStorage.setItem('usuarioActivo', this.nuevoUsuario);
      this.presentToast('Datos actualizados correctamente');
    } catch (error: any) {
      this.presentToast('Error al actualizar: ' + error.message);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
