/**
* <h1>Index Routing Module</h1>
*<p>
* Este modulo tiene cargados los titulos principales de secciones del sistema que contienen modulos
* ayuda para acceder a una vista mas detallada de los modulos.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

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
    path: 'reporte',
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
