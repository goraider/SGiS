import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { HubComponent } from './hub.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
      HubComponent
  ],
  declarations: [HubComponent]

})
export class HubModule { }
