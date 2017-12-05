import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { BuscarModuloPipe } from '../pipes/buscar-modulo.pipe';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  usuario: any = {}
  busqueda: string = "";

  menu: any[] = [];
  modulo: string;
  modulo_actual: string;
  tamano = document.body.clientHeight;
  constructor(private title: Title) { }
  
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));    
    var menu = JSON.parse(localStorage.getItem("menu"));

    var url = location.href.split("/");
    this.modulo = url[4];
    this.modulo_actual = this.modulo.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });

    for (let item of menu) {
      if (item.path.indexOf(this.modulo_actual.toLowerCase())>-1) {
        if (this.menu.indexOf(item) < 0)
          this.menu.push(item);
      }
    }
  }
}
