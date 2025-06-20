import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
  },
  {
    path: 'tabs',
    canActivate: [AuthGuard],// Asegurarse de que el usuario esté autenticado
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
  },
  {
    path: 'publicaciones',
    canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado
    loadChildren: () => import('./pages/publicaciones/publicaciones.module').then( m => m.PublicacionesPageModule),
  },
  {
    path: 'mensajes',
    canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado
    loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule),
  },
  {
    path: 'form-publicacion',
    canActivate: [AuthGuard], // Asegurarse de que el usuario esté autenticado
    loadChildren: () => import('./pages/form-publicacion/form-publicacion.module').then( m => m.FormPublicacionPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
