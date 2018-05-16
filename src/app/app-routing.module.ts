/**
* <h1>App Routing Module</h1>
*<p>
* Este modulo se encarga de obtener
* el inicio de sesion y a donde se
* va dirigir con el AuthGuard despues del login.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent }       from './login/login.component';

import { CambiarCluesComponent } from './dashboard/dash-temporal.component'



import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/transacciones/incidencia/lista', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
    { path: 'cambiar-clues', component: CambiarCluesComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }