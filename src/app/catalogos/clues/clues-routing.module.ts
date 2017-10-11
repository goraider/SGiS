import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';

import { AuthGuard } from  '../../auth-guard.service';


const routes: Routes = [
  { path: 'catalogos/clues', redirectTo: '/catalogos/clues/lista', pathMatch: 'full' },
  {
    path: 'catalogos/clues',
    children: [
       { path: 'lista', component: ListaComponent},
       { path: 'detalle/:id', component: ListaComponent},
    ],
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CluesRoutingModule { }
