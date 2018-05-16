/**
* <h1>Perfil Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a los diferentes componente del catalogo cargos
* en la carpeta asociada, para poder editar o listar.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { AuthGuard } from '../auth-guard.service';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  { path: 'perfil', redirectTo: '/sistema/perfil/editar/yo', pathMatch: 'full' },   
  {
    path: 'sistema/perfil',
    children: [
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
export class PerfilRoutingModule { }

