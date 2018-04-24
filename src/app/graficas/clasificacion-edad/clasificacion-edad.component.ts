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
    totales: any[] = [];
    nombres: any[] = [];
    porcentajes: any[] = []; 

    public barChartOptions:any = {
      scaleShowVerticalLines: false,
      scaleShowValues: false,
      responsive: true,

        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  // Create scientific notation labels
                  callback: function(value, index, values) {
                      return value + ' Embarazos';
                  }
              }
          }],

          xAxes: [{
              stacked: false,

              categoryPercentage: 1.0,
              barPercentage: 0.6,   
              
              ticks: {
                autoSkip: false,
              }

          }]
        },

   
        tooltips: {
          callbacks: {

              label: tooltipItem => `${tooltipItem.yLabel}: Embarazos`, 
              title: () => null,
          }
      },
        
    };

    
    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
    public colors:any = [

      {backgroundColor:'rgba(255, 99, 132, 0.6)'},
      {backgroundColor:'rgba(54, 162, 235, 0.6)'},
      {backgroundColor:'rgba(255, 206, 86, 0.6)'},
      {backgroundColor:'rgba(0, 255, 0, 0.6)'},
      {backgroundColor:'rgba(102, 0, 204, 0.6)'},
      {backgroundColor:'rgba(255, 128, 0, 0.6)'},
      {backgroundColor:'rgba(66, 128, 148, 0.6)'},
      {backgroundColor:'rgba(20, 8, 242, 0.6)'},
      {backgroundColor:'rgba(194, 27, 24, 0.6)'}

    ];

   
    public barChartData:any[] = [];
  
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
                
              this.datos = resultado as any[];
              //this.datos.push(...resultado);

  
              this.datos[6].clasificacionPorEdad.forEach(clasificacion_edad => {
                
                this.barChartLabels.push(clasificacion_edad.nombre);
 
                let clone = JSON.parse(JSON.stringify(this.barChartData));

                var objeto = { data  : [clasificacion_edad.total],
                               label : 'Embarazos'+' '+clasificacion_edad.nombre +':'+ ' '+ clasificacion_edad.porcentaje + '%',
                             };

                this.barChartData.push(objeto);

                clone.data = clasificacion_edad.total;
                //clone.label = clasificacion_edad.nombre;

                //this.barChartLabels.push(clasificacion_edad.nombre);

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