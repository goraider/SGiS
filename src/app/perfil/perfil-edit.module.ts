/**
* <h1>Perfil Edit Module</h1>
*<p>
* El modulo edita el perfil del usuario.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../hub/hub.module';
import { PerfilModule } from '../perfil/perfil.module';
import { BloquearPantallaModule } from '../bloquear-pantalla/bloquear-pantalla.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PaginacionModule } from '../parcial/paginacion/paginacion.module';

import { PipesModule }             from '../pipes/pipes.module';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthService } from '../auth.service';

import { MenuModule } from '../menu/menu.module';
import { ParcialModule } from '../parcial/parcial.module';

//crud
import { CrudService } from '../crud/crud.service';
import { CrudModule } from '../crud/crud.module';
//fin crud

import { Select2Module } from 'ng2-select2';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfilRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    MenuModule, 
    ParcialModule,
    CrudModule,
    Select2Module
  ],
  declarations: [       
    FormularioComponent 
  ],
  providers: [ AuthService, CrudService ]
})
export class PerfilEditModule { }
