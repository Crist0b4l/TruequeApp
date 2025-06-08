import { Component } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
  standalone: false,
})
export class MensajesPage {
  mensajes = [
    {
      publicacion: 'Silla de escritorio',
      remitente: 'Ana Torres',
      mensaje: 'Hola, tengo una lámpara LED que podría interesarte. ¿Te gustaría intercambiarla?',
      comuna: 'La Reina',
      fecha: '2025-06-06'
    },
    {
      publicacion: 'Cargador USB-C',
      remitente: 'Luis Martínez',
      mensaje: 'Tengo un cargador rápido casi nuevo. Me interesan tus audífonos bluetooth.',
      comuna: 'Las Condes',
      fecha: '2025-06-05'
    }
  ];
}
