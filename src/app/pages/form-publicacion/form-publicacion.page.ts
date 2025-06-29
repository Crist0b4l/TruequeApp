import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-form-publicacion',
  templateUrl: './form-publicacion.page.html',
  styleUrls: ['./form-publicacion.page.scss'],
  standalone: false,
})
export class FormPublicacionPage {
  // Campos del formulario
  titulo = '';
  descripcion = '';
  intercambio = '';
  tipo = 'Ofrece';
  categoria = '';
  comuna = '';

  // Imagen
  previewUrl?: string;
  imagenDataUrl: string = '';

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // metodo para usar cámara o galería
  async seleccionarImagen() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, // elegir camara o galeria
      });

      this.imagenDataUrl = image.dataUrl || '';
      this.previewUrl = this.imagenDataUrl;

      console.log('Imagen capturada:', this.imagenDataUrl);

    } catch (error: any) {
      if (error?.message?.includes('cancel')) {
        console.log('Usuario canceló la cámara o galería.');
        return;
      }
      console.error('Error al capturar imagen:', error);

      const toast = await this.toastCtrl.create({
        message: 'No se pudo obtener la imagen.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  async publicar() {
    if (
      !this.titulo || 
      !this.descripcion || 
      !this.intercambio || 
      !this.tipo || 
      !this.categoria || 
      !this.comuna || 
      !this.imagenDataUrl
    ) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos y selecciona una imagen.',
        duration: 2500,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    this.modalCtrl.dismiss(
      {
        tipo: this.tipo,
        titulo: this.titulo,
        descripcion: this.descripcion,
        intercambio: this.intercambio,
        usuario: 'Tú',
        comuna: this.comuna,
        categoria: this.categoria,
        imagen: this.imagenDataUrl,
      },
      'confirm'
    );
  }


  async obtenerUbicacion() {
    try{
      const position = await Geolocation.getCurrentPosition();

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const comuna = await this.obtenerComunaDesdeCoords(lat, lon);

      if (comuna) {
        this.comuna = comuna;
      } else {
        alert('No se pudo determinar la comuna.');
      }
    } catch (error: any) {
      console.error('Error al obtener la ubicación:', error);
      alert('Error al obtener la ubicación.');
    }
  }


  async obtenerComunaDesdeCoords(lat: number, lon: number): Promise<string | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      const comuna = data.address?.city || data.address?.town || data.address?.village;

      console.log('Comuna obtenida:', comuna);
      return comuna || null;
    } catch (error) {
      console.error('Error al obtener la comuna:', error);
      return null;
    }
  }
}
