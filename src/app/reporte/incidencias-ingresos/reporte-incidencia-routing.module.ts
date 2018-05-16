/**
* <h1>Indicencias Ingresos Routing Module</h1>
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

import { ReporteIncidenciaComponent } from './lista/lista.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'reporte/incidencia-ingresos/lista', redirectTo: '/reporte/incidencia-ingresos/lista', pathMatch: 'full' },
  {
    path: 'reporte/incidencia-ingresos',
    children: [
       { path: 'lista', component: ReporteIncidenciaComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReporteIncidenciaRoutingModule { }

