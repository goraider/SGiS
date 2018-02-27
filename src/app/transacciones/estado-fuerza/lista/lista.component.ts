import { Component, OnInit } from '@angular/core';
import { ListarComponent } from '../../../crud/listar.component';

@Component({
  selector: 'estado-fuerza-lista',
  templateUrl: './lista.component.html',
})

export class ListaComponent{
  tamano = document.body.clientHeight;
  usuario = JSON.parse(localStorage.getItem("usuario"));
}
