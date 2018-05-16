/**
* <h1>Hub Module</h1>
*<p>
* El modulo hub es donde se encuntra el acceso a los modulos del sistema
* que esten agregados en el archivo environments.ts y .prod.ts
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

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
