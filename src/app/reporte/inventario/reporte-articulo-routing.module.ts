import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteArticuloComponent } from './articulo/lista.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'reporte/inventario/articulo', redirectTo: '/reporte/inventario/articulo', pathMatch: 'full' },
  {
    path: 'reporte/inventario',
    children: [
       { path: 'articulo', component: ReporteArticuloComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReporteArticuloRoutingModule { }

