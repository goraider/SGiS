import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { ReporteEstadoFuerzaRoutingModule } from './reporte-estado-fuerza-routing.module';
import { PaginacionModule } from '../../parcial/paginacion/paginacion.module';

import { MenuModule } from '../../menu/menu.module';
import { ParcialModule } from '../../parcial/parcial.module';

import { ReporteEstadoFuerzaComponent } from './lista/lista.component';

import { AuthService } from '../../auth.service';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule }  from '../../crud/crud.module';
//fin crud
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReporteEstadoFuerzaRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    MenuModule, 
    ParcialModule,
    PaginacionModule,
    CrudModule,
    NguiAutoCompleteModule,
    NguiDatetimePickerModule

  ],
  declarations: [ 
    ReporteEstadoFuerzaComponent, 
  
  ],
  providers: [ AuthService, CrudService ]
})
export class ReporteEstadoFuerzaModule { }