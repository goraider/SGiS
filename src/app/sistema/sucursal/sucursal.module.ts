import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { SucursalRoutingModule } from './sucursal-routing.module';
import { PaginacionModule } from '../../parcial/paginacion/paginacion.module';

import { PipesModule }             from '../../pipes/pipes.module';
import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';

import { AuthService } from '../../auth.service';

import { MenuModule } from '../../menu/menu.module';
import { ParcialModule } from '../../parcial/parcial.module';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule } from '../../crud/crud.module';
//fin crud


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SucursalRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    MenuModule, 
    ParcialModule,
    CrudModule
  ],
  declarations: [ 
    FormularioComponent,
    ListaComponent
  ],
  providers: [ AuthService, CrudService ]
})
export class SucursalModule { }
