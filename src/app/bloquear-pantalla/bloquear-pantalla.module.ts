/**
* <h1>Bloquear Pantalla Module</h1>
*<p>
* El modulo Bloquear Pantalla realiza
* el bloqueo o re-inicio de sesion al usuario.
* por el tiempo de sesion al token a expirar.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloquearPantallaComponent } from './bloquear-pantalla.component';
import { BloquearPantallaService } from './bloquear-pantalla.service';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
      BloquearPantallaComponent
  ],
  providers: [BloquearPantallaService],
  declarations: [BloquearPantallaComponent]
})
export class BloquearPantallaModule { }
