/**
* <h1>Pantalla Informativa Module</h1>
*<p>
* El modulo Pantalla Informativa se encarga de mostrar las incidecias
* en un lapso de 24 horas.
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
import { PantallaInformativaRoutingModule } from './pantalla-informativa-routing.module';
import { PaginacionModule } from '../../parcial/paginacion/paginacion.module';

import { PipesModule }             from '../../pipes/pipes.module';
import { ListaComponent } from './lista/lista.component';

//servicios
import { AuthService } from '../../auth.service';

import { MenuModule } from '../../menu/menu.module';
import { ParcialModule } from '../../parcial/parcial.module';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule }  from '../../crud/crud.module';
//fin crud



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PantallaInformativaRoutingModule,
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
      ListaComponent,
    ],
    providers:[AuthService, CrudService],
})
export class PantallaInformativaModule { }