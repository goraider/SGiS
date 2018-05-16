/**
* <h1>Parcial Module</h1>
*<p>
* El modulo parcial se dedica a gestionar los elementos,
* de edicion, impresion, nuevos elementos etc.
* orientado a los permisos que tengan los usuarios.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { FormularioOpcionesComponent } from './formulario-opciones/opciones.component';
import { TablaOpcionesComponent } from './tabla-opciones/opciones.component';
import { TablaAccionesComponent } from './tabla-acciones/acciones.component';

import { SimpleOpcionesComponent } from './simple-opciones/simple-opciones.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [FormularioOpcionesComponent, TablaOpcionesComponent, TablaAccionesComponent, SimpleOpcionesComponent],
  exports: [FormularioOpcionesComponent, TablaOpcionesComponent, TablaAccionesComponent, SimpleOpcionesComponent]
})
export class ParcialModule { }
