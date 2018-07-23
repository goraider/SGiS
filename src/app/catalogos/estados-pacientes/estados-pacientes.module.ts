/**
* <h1>Estados del Paciente Module</h1>
*<p>
* El modulo Estados del Paciente es un catálogo para agregar los
* Recursos que tiene una unidad medica, como lo son medicamentos y personal.
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

//modulos
import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { EstadosPacientesRoutingModule } from './estados-pacientes-routing.module';
import { PaginacionModule } from '../../parcial/paginacion/paginacion.module';

import { PipesModule }             from '../../pipes/pipes.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthService } from '../../auth.service';

import { MenuModule } from '../../menu/menu.module';
import { ParcialModule } from '../../parcial/parcial.module';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule } from '../../crud/crud.module';
//fin crud

import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstadosPacientesRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    MenuModule, 
    ParcialModule,
    CrudModule,
    CKEditorModule
  ],
  declarations: [ 
    ListaComponent,   
    FormularioComponent 
  ],
  providers: [ AuthService, CrudService ]
})
export class EstadosPacientesModule { }