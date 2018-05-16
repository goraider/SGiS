/**
* dependencias a utilizar
*/
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Router } from '@angular/router';

import { Mensaje } from '../../mensaje';
import { NotificationsService } from 'angular2-notifications';



/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-total-ingresos',
  templateUrl: './total-ingresos.component.html',
  styleUrls: ['./total-ingresos.component.css']
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class TotalIngresosComponent implements OnInit {
    
    /**
    * Contiene los datos de la Unidad Medica del LocalStorage.
    * @type {any}
    */
    public clues = JSON.parse(localStorage.getItem("clues"));
    
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
    * Contiene el titulo de la grafica en el mensaje.
    * @type {any}
    */
    titulo:any = "Total de Ingresos"
    
    /**
    * Contiene el array de etiquetas que llevara la grafica.
    * @type {string}
    */
    public doughnutChartLabels:string[] = [];
    
    /**
    * Contiene los datos a graficar y sus cantidades.
    * @type {number}
    */
    public doughnutChartData:number[] = [];
    
    /**
    * Contiene los colores que se representaran en la grafica.
    * @type {any}
    */
    public doughnutChartColors:{}[] = [{backgroundColor: ['rgb(102, 153, 51, 0.9)', 'rgb(255, 204, 51, 0.9)', 'rgb(204, 51, 0, 0.9)']}];
    
    /**
    * Contiene el tipo de grafica.
    * @type {string}
    */
    public doughnutChartType:string = 'doughnut';
    
    /**
    * Contiene el total de incidencias a almacenar.
    * @type {any}
    */
    public totalIncidencias: any = '';

    /**
    * Contiene el nombre de los colores triage de las incidencias a almacenar.
    * @type {any}
    */
    public nombreColor: any[] = [];
    
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
                private ruta: Router,
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

            this.datos[1].triage.forEach(dete => {

              this.doughnutChartLabels.push(dete.nombre);
              this.doughnutChartData.push(dete.total);
              this.totalIncidencias = this.datos[0].totalTriage;
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

    /**
    * Este método refresca los datos, redirigiendo a un componente temporal
    * @param e contiene el evento a ejecutar, para refrescar los datos
    * y se tomen los datos del dashboard a la Unidad Medica que se seleccione.
    * @return void
    */
    cambiar_clues_dash(e){
      this.ruta.navigate(['/cambiar-clues']);
    }

  
}