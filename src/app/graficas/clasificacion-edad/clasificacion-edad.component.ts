import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core/src/metadata/directives';




@Component({
  selector: 'app-clasificacion-edad',
  templateUrl: './clasificacion-edad.component.html',
  styleUrls: ['./clasificacion-edad.component.css']
})
export class ClasificacionEdadComponent implements OnInit {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    datos: any[] = [];


    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
   
    public barChartData:any[] = [

      
    ];
  
    public nombre:  any;
    public porcentaje: any;
    public total: any;    
    public nombreColor: any[] = [];
    public numeroColor: number[] = [];

    cargando: boolean = false;
    
    constructor(private title: Title, private crudService: CrudService) {
      
    }

    ngOnInit() {

      this.listar('dashboard');

      //console.log("oninit",this.barChartData);
     
    }

    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => {
              this.cargando = false;
  
              //console.log("resultado");
              this.datos = resultado as any[];
              //this.datos.push(...resultado);

              console.log("datos por edad",this.datos[6]);
  
              

  
              this.datos[6].clasificacionPorEdad.forEach(clasificacion_edad => {

                console.log(clasificacion_edad);

                this.nombre = clasificacion_edad.nombre; 
                this.porcentaje = clasificacion_edad.porcentaje;
                this.total = clasificacion_edad.total;

                

                this.barChartLabels.push(this.nombre);
                


            });
            

            

              setTimeout(() => {
                if (this.chart && this.chart.chart && this.chart.chart.config) {
                  
                  this.chart.chart.update();
                }
              });
  

  
              
  
          },
          error => {
  
          }
      );
    }

    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
    mensaje(e){
      console.log("actaulizado");
    }
  
}