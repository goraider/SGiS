import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { FormularioOpcionesComponent } from './formulario-opciones/opciones.component';
import { TablaOpcionesComponent } from './tabla-opciones/opciones.component';
import { TablaAccionesComponent } from './tabla-acciones/acciones.component';

import { SimpleOpcionesComponent } from './simple-opciones/simple-opciones.component';
import { FiltrosReportesComponent } from './filtros-reportes/filtros-reportes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [FormularioOpcionesComponent, TablaOpcionesComponent, TablaAccionesComponent, SimpleOpcionesComponent, FiltrosReportesComponent],
  exports: [FormularioOpcionesComponent, TablaOpcionesComponent, TablaAccionesComponent, SimpleOpcionesComponent, FiltrosReportesComponent]
})
export class ParcialModule { }
