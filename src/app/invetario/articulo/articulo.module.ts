import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { ArticuloRoutingModule } from './articulo-routing.module';
import { PaginacionModule } from '../../parcial/paginacion/paginacion.module';

import { PipesModule }             from '../../pipes/pipes.module';
import { MenuModule } from '../../menu/menu.module';
import { ParcialModule } from '../../parcial/parcial.module';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { InicialComponent } from './inicial/formulario.component';

import { AuthService } from '../../auth.service';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule }  from '../../crud/crud.module';
//fin crud
import { Select2Module } from 'ng2-select2';
import { NguiDatetimePickerModule} from '@ngui/datetime-picker';
import { PDF417BarcodeModule } from 'angular2-pdf417-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArticuloRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    MenuModule, 
    ParcialModule,
    PaginacionModule,
    CrudModule,
    Select2Module,
    PipesModule,
    NguiDatetimePickerModule,
    PDF417BarcodeModule
  ],
  declarations: [ 
    ListaComponent,   
    FormularioComponent,
    InicialComponent
  ],
  providers: [ AuthService, CrudService ]
})
export class ArticuloModule { }