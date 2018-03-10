import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChartsModule } from 'ng2-charts';


import { GraficaDonaComponent } from './dona/dona.component';
import { GraficaPastelComponent } from './pastel/pastel.component';
import { GraficaBarraComponent } from './barra/barra.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
  ],
  declarations: [GraficaDonaComponent, GraficaPastelComponent, GraficaBarraComponent],
  exports: [GraficaDonaComponent, GraficaPastelComponent, GraficaBarraComponent]
})
export class GraficasModule { }