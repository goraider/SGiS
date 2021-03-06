/**
* <h1>Pantalla Informativa Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a los diferentes componentes del modulo Pantalla Informativa
* en la carpeta asociada, listar las incidencias actuales.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';

import { AuthGuard } from  '../../auth-guard.service';


const routes: Routes = [
  { path: 'transacciones/pantalla-informativa', redirectTo: '/transacciones/pantalla-informativa/lista', pathMatch: 'full' },
  {
    path: 'transacciones/pantalla-informativa',
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

export class PantallaInformativaRoutingModule { }
