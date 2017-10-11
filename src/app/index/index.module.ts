import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexRoutingModule } from './index-routing.module';

import { HubModule } from '../hub/hub.module';
import { PerfilModule } from '../perfil/perfil.module';
import { BloquearPantallaModule } from '../bloquear-pantalla/bloquear-pantalla.module';
import { PipesModule } from '../pipes/pipes.module';
import { MenuModule } from '../menu/menu.module';

import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PipesModule,
    MenuModule
  ],
  exports: [
    
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }
