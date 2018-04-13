import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';

import { AuthGuard } from  '../../auth-guard.service';


const routes: Routes = [
  { path: 'transacciones/pantalla-informativa', redirectTo: '/transacciones/pantalla-informativa/lista', pathMatch: 'full' },
  {
    path: 'transacciones/pantalla-informativa',
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

export class PantallaInformativaRoutingModule { }
