import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPublicacionPageRoutingModule } from './form-publicacion-routing.module';

import { FormPublicacionPage } from './form-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPublicacionPageRoutingModule
  ],
  declarations: [FormPublicacionPage]
})
export class FormPublicacionPageModule {}
