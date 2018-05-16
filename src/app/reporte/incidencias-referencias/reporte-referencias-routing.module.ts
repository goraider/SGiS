/**
* <h1>Indicencias Referencia Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a la lista a consultar.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteReferenciaComponent } from './lista/lista.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'reporte/incidencia-referencias/lista', redirectTo: '/reporte/incidencia-referencias/lista', pathMatch: 'full' },
  {
    path: 'reporte/incidencia-referencias',
    children: [
       { path: 'lista', component: ReporteReferenciaComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReporteReferenciaRoutingModule { }

