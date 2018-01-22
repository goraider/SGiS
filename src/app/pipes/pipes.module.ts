import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarModuloPipe } from './buscar-modulo.pipe'
import { GroupByPipe } from './groupBy.pipe';
import { OrderByPipe } from './orderBy.pipe';
import { BuscarPipe } from './buscar.pipe';
import { FormatoFechaPipe } from './formato-fecha.pipe';
import { TranscurridoPipe } from './transcurrido.pipe';
import { NgInit } from '../directives/ng-init.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BuscarModuloPipe,
    GroupByPipe,
    OrderByPipe,
    BuscarPipe,
    FormatoFechaPipe,
    TranscurridoPipe,
    NgInit
  ],
  declarations: [BuscarModuloPipe, GroupByPipe, OrderByPipe, BuscarPipe, FormatoFechaPipe, TranscurridoPipe, NgInit]
})
export class PipesModule { }
