/**
* <h1>Estado Routing Module</h1>
*<p>
* Este modulo contiene todos los estados de la republica
* no se encuentra agregado en los permisos y modulos en la sección de sistema,
* por si se necesitara habra que agregarlo
* la carpeta asociada, tiene la funcionalidad de: agregar, editar, listar y/o eliminar
* un nuevo elemento.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'catalogos/estado',
    children: [
       { path: 'lista', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent },
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
export class EstadoRoutingModule { }

