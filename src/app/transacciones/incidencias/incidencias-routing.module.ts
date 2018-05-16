/**
* <h1>Incidencias Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a los diferentes componentes del modulo Incidencias
* en la carpeta asociada, para poder agregar, editar, listar y/o eliminar
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
  { path: 'transacciones/incidencia', redirectTo: '/transacciones/incidencia/lista', pathMatch: 'full' },
  {
    path: 'transacciones/incidencia',
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
export class IncidenciasRoutingModule { }
