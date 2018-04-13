import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core/src/metadata/directives';




@Component({
  selector: 'app-clasificacion-ingresos',
  templateUrl: './clasificacion-ingresos.component.html',
  styleUrls: ['./clasificacion-ingresos.component.css']
})
export class ClasificacionIngresosComponent implements OnInit {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    datos: any[] = [];

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    
    public doughnutChartType:string = 'doughnut';

    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
   
    public barChartData:any[] = [
      {data: [], label: []},
      {data: [], label: []}
    ];
  
    public nombre:  any;
    public porcentaje: any;
    public totalConReferencia: any;
    public totalSinReferencia: any;
    public totalIncidencias: any = '';
    public nombreColor: any[] = [];
    public numeroColor: number[] = [];

    cargando: boolean = false;
    
    constructor(private title: Title, private crudService: CrudService) {
      this.doughnutChartLabels.length = 0;
      this.doughnutChartData.length = 0;
      
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
  
              
              //console.log("datos grafica barra",this.datos);

              this.datos[5].clasificacionIngreso[0].total;
              this.datos[5].clasificacionIngreso[1].total;
              
              this.barChartData[0].label.push('Ingresos Con Referencia'+' '+ '%'+this.datos[5].clasificacionIngreso[0].porcentaje);
              this.barChartData[1].label.push('Ingresos Sin Referencia'+' '+ '%'+this.datos[5].clasificacionIngreso[1].porcentaje);

              this.barChartData[0].data.push(this.datos[5].clasificacionIngreso[0].total);
              this.barChartData[1].data.push(this.datos[5].clasificacionIngreso[1].total);
  
              this.datos[5].clasificacionIngreso.forEach(clasificacion_ingresos => {

                this.nombre = clasificacion_ingresos.nombre; 
                this.porcentaje = clasificacion_ingresos.porcentaje;          

                

                this.barChartLabels.push(this.nombre);
                

                //console.log("barras",clasificacion_ingresos);


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
  
}