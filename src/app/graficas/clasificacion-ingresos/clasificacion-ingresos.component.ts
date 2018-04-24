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

    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true,

        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  // Create scientific notation labels
                  callback: function(value, index, values) {
                      return value + ' Ingresos';
                  }
              }
          }],

          xAxes: [{
            categoryPercentage: 1.0,
            barPercentage: 0.6
          }],
          
        },

        tooltips: {
          callbacks: {
              label: tooltipItem =>  `${tooltipItem.yLabel}: Ingresos`, 
              title: () => null,
          }
        },
    };

    public colors:any = [

      {backgroundColor:'rgba(54, 162, 235, 0.6)'},
      {backgroundColor:'rgba(194, 27, 24, 0.6)'},

    ];
   
    public barChartData:any[] = [];
  
    public nombre:  any;
    public porcentaje: any;
    public totalConReferencia: any;
    public totalSinReferencia: any;
    public totalIncidencias: any = '';
    public nombreColor: any[] = [];
    public numeroColor: number[] = [];

    cargando: boolean = false;
    
    constructor(private title: Title, private crudService: CrudService) {}

    ngOnInit() {

      this.listar('dashboard');
     
    }

    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => {
              this.cargando = false;
  
              //console.log("resultado");
              this.datos = resultado as any[];
              //this.datos.push(...resultado);
  
              this.datos[5].clasificacionIngreso.forEach(clasificacion_ingresos => {

                this.nombre = clasificacion_ingresos.nombre; 
                this.porcentaje = clasificacion_ingresos.porcentaje;          

                this.barChartLabels.push(this.nombre);

                
                let clone = JSON.parse(JSON.stringify(this.barChartData));

                var objeto = { data  : [clasificacion_ingresos.total],
                               label : clasificacion_ingresos.nombre +':'+ ' '+ clasificacion_ingresos.porcentaje + '%',
                             };

                this.barChartData.push(objeto);

                clone.data = clasificacion_ingresos.total;


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