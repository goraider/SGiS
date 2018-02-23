import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarComponent } from '../../../../crud/listar.component';
import { CrudService } from '../../../../crud/crud.service';

@Component({
  selector: 'visitas-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent{

  tamano = document.body.clientHeight;
  
  // tab:number = 1;
  // public id: string = '';

  // constructor(private parametrosRuta: ActivatedRoute, private crud: CrudService){
  //   this.parametrosRuta.params.subscribe( param => {
  //       //console.log(param['id']);
  //       this.id = param['id'];
  //       //hacer la petición para obtener seguimiento enviando el ID de la incidencia
  //     });
  // }
  //   @ViewChild('ctrl') list;

  //   ngOnInit() {
  //     // console.log('------------------------------Recibimos datos enviados de la incidencia----------------------');
  //     // this.seguimiento = JSON.parse(localStorage.getItem('seguimiento_paciente'));
  //     // localStorage.removeItem('seguimiento_paciente');
  //     // console.log(this.seguimiento);

  //   //this.crud.lista(0, 20, 'incidencias/1282017152656425')

  //     //console.log('CTRL:', this.list);
  //   }
  
}