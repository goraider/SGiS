/**
* <h1>Perfil Module</h1>
*<p>
* El modulo Perfil, muestra los datos
* del usuario y su perfil.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { PerfilComponent } from './perfil.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
      PerfilComponent
  ],
  providers: [],
  declarations: [PerfilComponent]

})
export class PerfilModule { }
