import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarModuloPipe } from './buscar-modulo.pipe';
import { GroupByPipe } from './groupBy.pipe';
import { OrderByPipe } from './orderBy.pipe';
import { BuscarPipe } from './buscar.pipe';
import { FormatoFechaPipe } from './formato-fecha.pipe';
import { TranscurridoPipe } from './transcurrido.pipe';

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
    TranscurridoPipe
  ],
  declarations: [BuscarModuloPipe, GroupByPipe, OrderByPipe, BuscarPipe, FormatoFechaPipe, TranscurridoPipe]
})
export class PipesModule { }
