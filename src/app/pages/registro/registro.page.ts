import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {

  intentoEnvio = false;
  usuarioExistente = false;
  emailExistente = false;

  usuario = {
    usuario: '',
    password: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    comuna: '',
    email: ''
  };

  constructor(
    private dbService: DbserviceService,
    private toastController: ToastController,
    private router: Router
  ) {}

  get usuarioInvalido(): boolean {
    return this.usuario.usuario !== '' && (this.usuario.usuario.length < 4 || this.usuario.usuario.length > 10);
  }

  get passwordInvalida(): boolean {
    return this.usuario.password !== '' && !/^\d{4}$/.test(this.usuario.password);
  }

  get emailInvalido(): boolean {
    return this.usuario.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email);
  }


  ngOnInit() {}

  async verificarUsuarioEmail() {
    const usuario = this.usuario.usuario.trim();
    const email = this.usuario.email.trim();

    const resultado = await this.dbService.existeUsuario(usuario, email);
    this.usuarioExistente = resultado.usuarioExistente;
    this.emailExistente = resultado.emailExistente;
  }

  async registrarUsuario() {
    this.intentoEnvio = true;

    if (!this.camposCompletos()) {
      this.presentToast('Por favor, completa todos los campos');
      return;
    }

    await this.verificarUsuarioEmail();

    if (this.usuarioExistente || this.emailExistente) {
      this.presentToast('El usuario o correo ya están registrados');
      return;
    }

    try {
      await this.dbService.insertUsuario(this.usuario);
      this.presentToast('Usuario registrado con éxito');
      this.limpiarCampos();
      this.intentoEnvio = false;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.presentToast('Error al registrar usuario: ' + error.message);
    }
  }
//Ver usuarios es una función que se puede descomentar si se desea ver los usuarios registrados
  async verUsuarios() {
  try {
    const usuarios = await this.dbService.getUsuarios();
    console.log('Usuarios:', usuarios);

    const texto = usuarios.map(u => `${u.id} - ${u.usuario} - ${u.email} - ${u.password}`).join('\n');
    alert('Usuarios:\n' + texto);
  } catch (error: any) {
    this.presentToast('Error al obtener usuarios: ' + error.message);
  }
}


  camposCompletos(): boolean {
    const camposLlenos = Object.values(this.usuario).every(value => (value || '').toString().trim() !== '');
    return camposLlenos && this.validacionesExtra();
  }
  
  validacionesExtra(): boolean {
  if (this.usuarioInvalido) {
    this.presentToast('El nombre de usuario debe tener entre 4 y 10 caracteres');
    return false;
  }

  if (this.passwordInvalida) {
    this.presentToast('La contraseña debe tener exactamente 4 números');
    return false;
  }

  if (this.emailInvalido) {
    this.presentToast('El correo debe tener el formato correcto (ej: nombre@dominio.com)');
    return false;
  }

  return true;
}





  limpiarCampos() {
    this.usuario = {
      usuario: '',
      password: '',
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      telefono: '',
      comuna: '',
      email: ''
    };
    this.usuarioExistente = false;
    this.emailExistente = false;
    this.intentoEnvio = false;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
