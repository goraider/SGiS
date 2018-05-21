/**
* dependencias a utilizar
*/
import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';
import { Observable } from 'rxjs';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { observeOn } from 'rxjs/operator/observeOn';
import { EventEmitter } from 'selenium-webdriver';

import { Mensaje } from '../../mensaje';
import { NotificationsService } from 'angular2-notifications';



/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-total-altas',
  templateUrl: './total-altas.component.html',
  styleUrls: ['./total-altas.component.css']
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class TotalAltasComponent implements OnInit {

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
    titulo:any = "Total de Altas"

    /**
    * Contiene la bandaera para indicar si se cargo la lista
    * respecto a la consulta.
    * @type {boolean}
    */
    cargando:boolean = false;
    
    /**
    * Contiene los cambios y propiedades de la
    * libreria ng2-charts.
    * @type {BaseChartDirective}
    */
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    /**
    * Contiene el mensaje a mostrar.
    * @type {string}
    */
    mensajeResponse: Mensaje = new Mensaje(true);
    
    /**
    * Contiene el array de datos a consultar.
    * @type {array:any}
    */
    datos: any[] = [];
    
    /**
    * Contiene el array de etiquetas que llevara la grafica.
    * @type {string}
    */
    public pieChartLabels:string[] = [];
    
    /**
    * Contiene los datos a graficar y sus cantidades.
    * @type {number}
    */
    public pieChartData:number[] = [];

    /**
    * Contiene los colores que se representaran en la grafica.
    * @type {any}
    */
    public pieChartColors:{}[] = [{backgroundColor: ['rgb(56, 190, 56, 0.9)', 'rgb(1, 116, 223, 0.9)', 'rgb(5, 4, 9, 0.9)']}];

    /**
    * Contiene el tipo de grafica.
    * @type {string}
    */
    public pieChartType:string = 'pie';  

    /**
    * Contiene el nombre que traiga del color triage
    * del forEach.
    * @type {any}
    */
    public nombreColor: any[] = [];

    /**
    * Contiene el nombre de la iteracion
    * del forEach.
    * @type {any}
    */
    public nombre:  any;

    /**
    * Contiene el total que traiga
    * el forEach.
    * @type {any}
    */
    public total: any;

    /**
    * Contiene el total de altas que traiga
    * el forEach.
    * @type {any}
    */
    public totalAltas: any = '';

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
              this.datos = resultado as any[];
              //this.datos.push(...resultado);

              this.datos[4].altas.forEach(dete => {
                this.nombre = dete.nombre;             
                this.total = dete.total;

                this.pieChartLabels.push(this.nombre);
                this.pieChartData.push(this.total);

                this.totalAltas = this.datos[3].totalAltas;

                this.nombreColor.push(dete);

            });

              setTimeout(() => {
                if (this.chart && this.chart.chart && this.chart.chart.config) {
                  
                  this.chart.chart.update();
                }
              });

              this.mensajeResponse.mostrar = true;
              this.mensajeResponse.texto = "Gráfica Cargada";
              this.mensajeResponse.clase = "success";
              this.mensaje(2);
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