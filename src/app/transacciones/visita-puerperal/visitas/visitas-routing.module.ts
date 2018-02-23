import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../../auth-guard.service';


const routes: Routes = [
  // { path: 'incidencias/visita', redirectTo: 'incidencias/visita/lista/:id', pathMatch: 'full' },
  {
    path: 'transacciones/visita-puerperal',
    children: [
       { path: 'lista/:id', component: ListaComponent},
       { path: 'nuevo/:id', component: FormularioComponent },
       { path: 'editar/:id', component: FormularioComponent},
    ],
    canActivate: [AuthGuard]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class VisitasRoutingModule { }
