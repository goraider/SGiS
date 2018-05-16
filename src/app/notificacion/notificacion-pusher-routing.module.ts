/**
* <h1>Notificacion Pusher Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a los diferentes componente del catalogo cargos
* en la carpeta asociada, para poder listar
* las notificaciones.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista.component';

import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'notificacion',
    children: [
       { path: 'lista', component: ListaComponent},
    ],
    canActivate: [AuthGuard]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NotificacionPusherRoutingModule { }

