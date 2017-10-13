import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarModuloPipe } from './buscar-modulo.pipe';
import { GroupByPipe } from './groupBy.pipe';
import { TranscurridoPipe } from './transcurrido.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    BuscarModuloPipe,
    GroupByPipe,
    TranscurridoPipe
  ],
  declarations: [BuscarModuloPipe, GroupByPipe, TranscurridoPipe]
})
export class PipesModule { }
