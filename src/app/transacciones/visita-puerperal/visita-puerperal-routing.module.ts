/**
* <h1>Visitas Puerperales Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a la lista de las Altas y generar sus Visitas Puerperales
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [

  { path: 'transacciones/visita-puerperal', redirectTo: '/transacciones/visita-puerperal/lista', pathMatch: 'full' },
  {
    path: 'transacciones/visita-puerperal',
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
export class VisitaPuerperalRoutingModule { }
