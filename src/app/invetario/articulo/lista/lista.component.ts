import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'articulo-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent{
  tamano = document.body.clientHeight;
  permisos = JSON.parse(localStorage.getItem("permisos"));

  abrirModal(id) {
    document.getElementById(id).classList.add('is-active');
  }

  cancelarModal(id) {
    document.getElementById(id).classList.remove('is-active');
  }
}