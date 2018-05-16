/**
* <h1>Index Module</h1>
*<p>
* El modulo index muestra si cada hub tiene hijos para mostrar otros modulos.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexRoutingModule } from './index-routing.module';

import { HubModule } from '../hub/hub.module';
import { PerfilModule } from '../perfil/perfil.module';
import { BloquearPantallaModule } from '../bloquear-pantalla/bloquear-pantalla.module';
import { PipesModule } from '../pipes/pipes.module';
import { MenuModule } from '../menu/menu.module';

import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PipesModule,
    MenuModule
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }