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
