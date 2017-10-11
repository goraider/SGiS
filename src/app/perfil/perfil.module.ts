import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { PerfilComponent } from './perfil.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
      PerfilComponent
  ],
  providers: [],
  declarations: [PerfilComponent]

})
export class PerfilModule { }
