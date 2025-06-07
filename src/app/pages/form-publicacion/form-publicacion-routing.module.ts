import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPublicacionPage } from './form-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: FormPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPublicacionPageRoutingModule {}
