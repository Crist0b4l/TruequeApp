import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

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

  async obtenerUbicacion() {
  try {
    const position = await Geolocation.getCurrentPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log('Latitud:', lat, 'Longitud:', lon);

    // Llama a API externa para obtener comuna
    await this.obtenerComunaDesdeCoords(lat, lon);

  } catch (error) {
    console.error('Error obteniendo ubicación', error);
    this.presentToast('No se pudo obtener tu ubicación');
  }
}

async obtenerComunaDesdeCoords(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const comuna = data.address?.city || data.address?.town || data.address?.village;

    if (comuna) {
      this.usuario.comuna = comuna;
      this.presentToast(`Comuna detectada: ${comuna}`);
    } else {
      this.presentToast('No se pudo detectar la comuna');
    }

    console.log('Respuesta API:', data);

  } catch (error) {
    console.error('Error en reverse geocoding:', error);
    this.presentToast('Error al obtener comuna desde coordenadas');
  }
}


}
