import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';


import { Input } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'app-diagnosticos-cie10',
  templateUrl: './diagnosticos-cie10.component.html'
})
export class GiagnosticosCie10Component implements OnInit {

    datos: any[] = [];
    tamano = document.body.clientHeight;
    public top_cie10: any [] = [];
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
              this.cargando = false;
  

              this.datos = resultado as any[];
     

              this.datos[2].topCie10.forEach(top_cie10 => {

                this.top_cie10.push(top_cie10); 


            });


 
              
  
          },
          error => {
  
          }
      );
    }
  
}