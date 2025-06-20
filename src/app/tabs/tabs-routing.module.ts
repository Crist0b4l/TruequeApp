import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'publicaciones',
        canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado  
        loadChildren: () => import('../pages/publicaciones/publicaciones.module').then(m => m.PublicacionesPageModule),
      },
      {
        path: 'mensajes',
        canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado
        loadChildren: () => import('../pages/mensajes/mensajes.module').then(m => m.MensajesPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
