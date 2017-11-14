import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { FormularioOpcionesComponent } from './formulario-opciones/opciones.component';
import { TablaOpcionesComponent } from './tabla-opciones/opciones.component';
import { TablaAccionesComponent } from './tabla-acciones/acciones.component';

import { SimpleOpcionesComponent } from './simple-opciones/simple-opciones.component';
import { FiltrosReportesComponent } from './filtros-reportes/filtros-reportes.component';

import { FiltrosReporteIncidenciaComponent } from './filtros-reporte-incidencia/filtros-reporte-incidencia.component';


//crud
import { CrudService } from '../crud/crud.service';
import { CrudModule }  from '../crud/crud.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CrudModule
  ],
  
  declarations: [
                  FormularioOpcionesComponent,
                  TablaOpcionesComponent,
                  TablaAccionesComponent,
                  SimpleOpcionesComponent,
                  FiltrosReportesComponent,
                  FiltrosReporteIncidenciaComponent
                ],
  exports:      [
                  FormularioOpcionesComponent,
                  TablaOpcionesComponent,
                  TablaAccionesComponent,
                  SimpleOpcionesComponent,
                  FiltrosReportesComponent,
                  FiltrosReporteIncidenciaComponent
                ],
  providers:    [
                  CrudService
                ],
})
export class ParcialModule { }
