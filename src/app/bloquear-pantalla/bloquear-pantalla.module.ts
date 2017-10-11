import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloquearPantallaComponent } from './bloquear-pantalla.component';
import { BloquearPantallaService } from './bloquear-pantalla.service';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
      BloquearPantallaComponent
  ],
  providers: [BloquearPantallaService],
  declarations: [BloquearPantallaComponent]
})
export class BloquearPantallaModule { }
