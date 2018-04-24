import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';


import { Input } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'app-porcentajes',
  templateUrl: './porcentajes.component.html'
})
export class PorcentajesComponent implements OnInit {

    datos: any[] = [];
  
    public embarazos: any [] = [];
    public partos: any [] = [];
    public puerperio: any [] = [];
    public porcentajeExito: any = '';
    cargando: boolean = false;
    
    constructor(private title: Title, private crudService: CrudService) {
      
    }

    ngOnInit() {

      this.listar('dashboard');
     
    }

    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => { 

              this.datos = resultado as any[];

              this.embarazos.push(this.datos[8].embarazos[0]);
              this.partos.push(this.datos[9].partos[0]);
              this.puerperio.push(this.datos[10].puerperio[0]);
              this.porcentajeExito = this.datos[7].procentajeExitoAtencion;

              this.cargando = false;

              
          },
          error => {
  
          }
      );
    }
  
}