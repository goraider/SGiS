/**
* <h1>Dashboard Module</h1>
*<p>
* El modulo dashboard sirve para administrar graficas y/o tableros
* y muestra estadistica descriptiva de cada Uniudad Medica.
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
import { HubModule } from '../hub/hub.module';
import { PerfilModule } from '../perfil/perfil.module';
import { BloquearPantallaModule } from '../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../parcial/paginacion/paginacion.module';


//componentes del dash
import { PipesModule }             from '../pipes/pipes.module';
import { ChartsModule } from 'ng2-charts';
import { GraficasModule } from '../graficas/graficas.module'
import { DashboardComponent } from './dashboard.component';

import { CambiarCluesComponent } from './dash-temporal.component';

//servicios
import { AuthService } from '../auth.service';

import { MenuModule } from '../menu/menu.module';
import { ParcialModule } from '../parcial/parcial.module';


//crud
import { CrudService } from '../crud/crud.service';
import { CrudModule }  from '../crud/crud.module';
//fin crud

import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    GraficasModule,
    ReactiveFormsModule,
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
    DashboardComponent,
    CambiarCluesComponent,
  ],
  providers: [ AuthService, CrudService ],
})
export class DashModule { }