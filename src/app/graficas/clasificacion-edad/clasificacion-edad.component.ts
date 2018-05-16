/**
* dependencias a utilizar
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core/src/metadata/directives';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-clasificacion-edad',
  templateUrl: './clasificacion-edad.component.html',
  styleUrls: ['./clasificacion-edad.component.css']
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class ClasificacionEdadComponent implements OnInit {
    
    /**
    * Contiene los cambios y propiedades de la
    * libreria ng2-charts.
    * @type {BaseChartDirective}
    */
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    
    /**
    * Contiene el array de datos a consultar.
    * @type {array:any}
    */
    datos: any[] = [];
    
    /**
    * Contiene las opciones y propiedades
    * de las barras.
    * @type {object:any}
    */
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

    /**
    * Contiene el array de etiquetas que llevara la grafica.
    * @type {string}
    */
    public barChartLabels:string[] = [];
    
    /**
    * Contiene el tipo de grafica.
    * @type {string}
    */
    public barChartType:string = 'bar';

    /**
    * Contiene la bandera si lleva leyenda la grafica o no.
    * @type {boolean}
    */
    public barChartLegend:boolean = true;

    /**
    * Contiene los colores de la grafica a
    * utilizar.
    * @type {Array:any}
    */
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

    /**
    * Contiene los datos a graficar y sus cantidades.
    * @type {number}
    */
    public barChartData:any[] = [];
    
    /**
    * Contiene la bandaera para indicar si se cargo la lista
    * respecto a la consulta.
    * @type {boolean}
    */
    cargando: boolean = false;
    
    /**
    * Este método inicializa la carga de las dependencias 
    * que se necesitan para el funcionamiento del catalogo
    */
    constructor(private title: Title, private crudService: CrudService) {}
    
    /**
    * Este método inicializa la carga de la vista asociada junto los datos del formulario
    * @return void
    */
    ngOnInit() {

      this.listar('dashboard');
     
    }
    
    /**
    * Este método obtiene los datos de la ruta dashboard
    * @return void
    * @param url inicializa la ruta que se manda al servicio para
    * obtener los datos que se requieren.
    */
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