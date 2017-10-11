import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PaginacionModule } from '../../parcial/paginacion/paginacion.module';

import { MenuModule } from '../../menu/menu.module';
import { ParcialModule } from '../../parcial/parcial.module';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthService } from '../../auth.service';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule }  from '../../crud/crud.module';
//fin crud
import { Select2Module } from 'ng2-select2';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    MenuModule, 
    ParcialModule,
    PaginacionModule,
    CrudModule,
    Select2Module
  ],
  declarations: [ 
    ListaComponent,   
    FormularioComponent,
  
  ],
  providers: [ AuthService, CrudService ]
})
export class UsuariosModule { }