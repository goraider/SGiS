/**
* <h1>Wildcard Routing Module</h1>
*<p>
* Este modulo contiene la ruta para verificar
* si existe o no una ruta, para marcar que no existe.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent }    from './parcial/not-found/not-found.component';


const routes: Routes = [
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WildcardRoutingModule { }