import { Component, OnInit } from '@angular/core';
import { ListarComponent } from '../../../crud/listar.component';

@Component({
  selector: 'directorio-apoyos-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent{
  tamano = document.body.clientHeight;
}
