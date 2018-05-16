/**
* <h1>Menu Module</h1>
*<p>
* El modulo Menu, muestra los accesos
* al hub entre otros elementos para su acceso
* directo entre los demas componentes.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { HubModule } from '../hub/hub.module';
import { PerfilModule } from '../perfil/perfil.module';
import { BloquearPantallaModule } from '../bloquear-pantalla/bloquear-pantalla.module';

import { MenuComponent } from './menu.component';

import { MenuAsideComponent } from './menu-aside/menu-aside.component';
import { PipesModule }             from '../pipes/pipes.module';
import { ParcialModule } from '../parcial/parcial.module';

//notificaciones
import { NotificacionPusherComponent } from '../notificacion/notificacion-pusher.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HubModule,
    PerfilModule,    
    BloquearPantallaModule,
    PipesModule,
    ParcialModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [MenuComponent, MenuAsideComponent, NotificacionPusherComponent],
  exports: [MenuComponent, MenuAsideComponent, NotificacionPusherComponent]
})
export class MenuModule { }
