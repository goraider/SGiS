import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteVentaComponent } from './venta/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'reporte/resumen/venta', redirectTo: '/reporte/resumen/venta', pathMatch: 'full' },
  {
    path: 'reporte/resumen',
    children: [
       { path: 'venta', component: ReporteVentaComponent},
       { path: 'filtra', component: FormularioComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReporteVentaRoutingModule { }

