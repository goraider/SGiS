import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarModuloPipe } from './buscar-modulo.pipe';
import { GroupByPipe } from './groupBy.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    BuscarModuloPipe,
    GroupByPipe
  ],
  declarations: [BuscarModuloPipe, GroupByPipe]
})
export class PipesModule { }
