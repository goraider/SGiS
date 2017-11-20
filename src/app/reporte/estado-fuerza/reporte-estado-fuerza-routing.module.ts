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

