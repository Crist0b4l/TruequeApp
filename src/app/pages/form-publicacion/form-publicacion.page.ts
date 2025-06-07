import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-publicacion',
  templateUrl: './form-publicacion.page.html',
  styleUrls: ['./form-publicacion.page.scss'],
  standalone: false,
})
export class FormPublicacionPage {
  // Campos que va a llenar el usuario
  titulo = '';
  descripcion = '';
  intercambio = '';
  tipo = 'Ofrece';
  categoria = '';
  comuna = '';



  // Esta variable guarda la imagen que se va a mostrar como vista previa
  previewUrl: string | ArrayBuffer | null = null;

  // Esta es la imagen que realmente se va a guardar en la publicación (en base64)
  imagenDataUrl: string = '';

  constructor(private modalCtrl: ModalController) {}

  // cierra el modal sin hacer nada
  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // Cuando el usuario elige una imagen desde su equipo
  onFileSelected(event: any) {
    const file = event.target.files[0]; // tomo el archivo que subió

    if (file) {
      const reader = new FileReader(); // esto sirve para leer archivos como texto

      // cuando el archivo se termina de leer, guardo la imagen como base64
      reader.onload = () => {
        this.previewUrl = reader.result;       // esta es para mostrar la vista previa
        this.imagenDataUrl = reader.result as string; // esta se guarda para usarla después
      };

      // convierto el archivo en una URL base64 que el navegador puede mostrar
      reader.readAsDataURL(file);
    }
  }

  // cuando el usuario aprieta "publicar"
  publicar() {
    // si algún campo está vacío, no dejo publicar
    if (!this.titulo || !this.descripcion || !this.intercambio) {
      return;
    }

    // envío los datos de la publicación al modal padre (la página de publicaciones)
    this.modalCtrl.dismiss(
      {
        tipo: this.tipo,
        titulo: this.titulo,
        descripcion: this.descripcion,
        intercambio: this.intercambio,
        usuario: 'Tú',
        comuna: this.comuna || 'Desconocida',
        categoria: this.categoria || 'Sin categoría',
        // si subió una imagen, la uso; si no, uso una por defecto
        imagen: this.imagenDataUrl || 'assets/img/default.jpg'
      },
      'confirm'
    );
  }
}
