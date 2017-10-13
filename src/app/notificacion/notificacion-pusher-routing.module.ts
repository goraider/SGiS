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

