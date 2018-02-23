import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';

import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'sistema',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalogos',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transacciones',
    component: IndexComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reportes',
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
