import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clues-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent{
   tamano;
  ngOnInit() {
    this.tamano = document.body.clientHeight;
  }
}