/**
* <h1>Paginacion Module</h1>
*<p>
* El modulo Paginacion realiza las operaciones
* para seccionar los datos en diversas paginar,
* ya sea en la lista de los componentes o las busquedas.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacionComponent } from './paginacion.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    PaginacionComponent
  ],
  declarations: [PaginacionComponent]
})
export class PaginacionModule { }
