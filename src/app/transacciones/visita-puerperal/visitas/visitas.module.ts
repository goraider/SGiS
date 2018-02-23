import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

//modulos
import { HubModule } from '../../../hub/hub.module';
import { PerfilModule } from '../../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../../bloquear-pantalla/bloquear-pantalla.module';
import { VisitasRoutingModule } from '../visitas/visitas-routing.module';
import { PaginacionModule } from '../../../parcial/paginacion/paginacion.module';


//componentes del catalogo
import { PipesModule }             from '../../../pipes/pipes.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

//servicios
import { AuthService } from '../../../auth.service';

import { MenuModule } from '../../../menu/menu.module';
import { ParcialModule } from '../../../parcial/parcial.module';


//crud
import { CrudService } from '../../../crud/crud.service';
import { CrudModule }  from '../../../crud/crud.module';
//fin crud

import { CKEditorModule } from 'ng2-ckeditor';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VisitasRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    MenuModule,
    ParcialModule,
    CrudModule,
    NguiAutoCompleteModule,
    CKEditorModule,
    NguiDatetimePickerModule

  ],
  declarations: [
    ListaComponent,
    FormularioComponent   
  ],
  providers: [ AuthService, CrudService ],
})
export class VisitasModule { }