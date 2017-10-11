import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { InicialComponent } from './inicial/formulario.component';

import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'inventario/articulo',
    children: [
       { path: 'lista', component: ListaComponent},
       { path: 'inicial', component: InicialComponent},
       { path: 'nuevo', component: FormularioComponent },
       { path: 'editar/:id', component: FormularioComponent},
    ],
    canActivate: [AuthGuard]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ArticuloRoutingModule { }

