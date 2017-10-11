import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';

import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'catalogos',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'personas',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'operacion',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inventario',
    component: IndexComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class IndexRoutingModule { }
