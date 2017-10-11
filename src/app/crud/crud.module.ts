/**
* <h1>Crud Module</h1>
*<p>
* El modulo crud se encarga de exportar las funciones que
* se encargan de listar, ver, modificar, agregar y eliminar
* para que esten disponibles en todos los modulos del sistema
* </p>
*
* @author  Eliecer Ramirez Esquinca
* @version 1.0
* @since   2017-05-08 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarComponent } from './listar.component';
import { FormularioComponent } from './formulario.component';

import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        SimpleNotificationsModule.forRoot()
    ],
    exports: [
        ListarComponent,
        FormularioComponent
    ],
    declarations: [
        ListarComponent,
        FormularioComponent
    ]
})
export class CrudModule { }
