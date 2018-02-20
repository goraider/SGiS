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

