/**
* dependencias a utilizar
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core/src/metadata/directives';

import { Mensaje } from '../../mensaje';
import { NotificationsService } from 'angular2-notifications';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-clasificacion-ingresos',
  templateUrl: './clasificacion-ingresos.component.html',
  styleUrls: ['./clasificacion-ingresos.component.css']
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class ClasificacionIngresosComponent implements OnInit {
    
    /**
    * Contiene los cambios y propiedades de la
    * libreria ng2-charts.
    * @type {BaseChartDirective}
    */
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    /**
    * Contiene las propiedades del mensaje a mostrar
    * @type {object}
    */
    public options = {
      position: ["bottom", "left"],
      timeOut: 1000,
      lastOnBottom: true
    };

    /**
    * Contiene el titulo de la grafica en el mensaje.
    * @type {any}
    */
    titulo:any = "Clasificación por Ingresos"

    /**
    * Contiene el mensaje a mostrar.
    * @type {string}
    */
    mensajeResponse: Mensaje = new Mensaje(true);
    
    /**
    * Contiene array con los valores de la lista
    * respecto a la consulta.
    * @type {any}
    */
    datos: any[] = [];

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
    * Contiene la bandaera si si o no lleva leyenda la grafica.
    * @type {boolean}
    */
    public barChartLegend:boolean = true;
    
    /**
    * Contiene las opciones de la grafica
    * @type {any}
    */
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

    /**
    * Contiene los colores a utilizar en la grafica
    * @type {any}
    */
    public colors:any = [

      {backgroundColor:'rgba(54, 162, 235, 0.6)'},
      {backgroundColor:'rgba(194, 27, 24, 0.6)'},

    ];

    /**
    * Contiene los datos a graficar y sus cantidades.
    * @type {any}
    */
    public barChartData:any[] = [];
    
    /**
    * Contiene el nombre de los elementos.
    * @type {any}
    */
    public nombre:  any;
    
    /**
    * Contiene el porcentaje de los elementos.
    * @type {any}
    */
    public porcentaje: any;

    /**
    * Contiene el total de los elementos con referencia.
    * @type {any}
    */
    public totalConReferencia: any;

    /**
    * Contiene el total de los elementos sin referencia.
    * @type {any}
    */
    public totalSinReferencia: any;
    
    /**
    * Contiene el total de incidencias a graficar.
    * @type {any}
    */
    public totalIncidencias: any = '';
    
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
    constructor(private title: Title,
                private crudService: CrudService,
                private notificacion: NotificationsService,) { }
    
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

            this.mensajeResponse.mostrar = true;
            this.mensajeResponse.texto = "Lista Cargada";
            this.mensajeResponse.clase = "success";
            this.mensaje(2);
            

            

              setTimeout(() => {
                if (this.chart && this.chart.chart && this.chart.chart.config) {
                  this.chart.chart.update();
                }
              });
  

  
          },
          error => {

            this.cargando = false;
            this.mensajeResponse.mostrar = true;
            
            try {
                let e = error.json();
                if (error.status == 401) {
                    this.mensajeResponse.texto = "No tiene permiso para hacer esta operación.";
                    this.mensajeResponse.clase = "danger";
                    this.mensaje(2);
                }
            } catch (e) {
                if (error.status == 500) {
                    this.mensajeResponse.texto = "500 (Error interno del servidor)";
                } else {
                    this.mensajeResponse.texto = "pretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir. 7";
                }
                this.mensajeResponse.clase = "danger";
                this.mensaje(2);
              }
  
          }
      );
    }

   /**
   * Este método muestra los mensajes resultantes de los llamados de la api
   * @param cuentaAtras numero de segundo a esperar para que el mensaje desaparezca solo
   * @param posicion  array de posicion [vertical, horizontal]
   * @return void
   */
    mensaje(cuentaAtras: number = 6, posicion: any[] = ["bottom", "left"]): void {

      var objeto = {
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: this.mensajeResponse.texto.length
      };

      this.options = {
          position: posicion,
          timeOut: cuentaAtras * 1000,
          lastOnBottom: true
      };
      if (this.mensajeResponse.titulo == '')
          this.mensajeResponse.titulo = this.titulo;

      if (this.mensajeResponse.clase == 'alert')
          this.notificacion.alert(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

      if (this.mensajeResponse.clase == 'success')
          this.notificacion.success(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

      if (this.mensajeResponse.clase == 'info')
          this.notificacion.info(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

      if (this.mensajeResponse.clase == 'warning' || this.mensajeResponse.clase == 'warn')
          this.notificacion.warn(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

      if (this.mensajeResponse.clase == 'error' || this.mensajeResponse.clase == 'danger')
          this.notificacion.error(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

   }

}