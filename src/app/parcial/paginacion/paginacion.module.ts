import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacionComponent } from './paginacion.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    PaginacionComponent
  ],
  declarations: [PaginacionComponent]
})
export class PaginacionModule { }
