import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { GraficaDonaComponent } from './dona/dona.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [GraficaDonaComponent],
  exports: [GraficaDonaComponent]
})
export class GraficasModule { }