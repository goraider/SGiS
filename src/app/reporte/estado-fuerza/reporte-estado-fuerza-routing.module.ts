/**
* <h1>Reporte de Estado de Fuerza Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a la lista a consultar.
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteEstadoFuerzaComponent } from './lista/lista.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'reporte/estado-fuerza/lista', redirectTo: '/reporte/estado-fuerza/lista', pathMatch: 'full' },
  {
    path: 'reporte/estado-fuerza',
    children: [
       { path: 'lista', component: ReporteEstadoFuerzaComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReporteEstadoFuerzaRoutingModule { }

