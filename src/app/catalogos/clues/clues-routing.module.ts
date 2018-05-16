/**
* <h1>Clues Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a los diferentes componente del catalogo clues
* en la carpeta asociada, para poder listar y generar detalle
* en la informacón de una Unidad Medica.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

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
