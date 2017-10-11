import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'configuracion', redirectTo: '/sistema/configuracion/editar', pathMatch: 'full' },
  {
    path: 'sistema/configuracion',
    children: [
       { path: 'editar', component: FormularioComponent },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ConfiguracionRoutingModule { }

