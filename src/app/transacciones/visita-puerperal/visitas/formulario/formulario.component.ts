/**
* dependencias a utilizar
*/

import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule } from '@angular/forms';
import { CrudService } from '../../../../crud/crud.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { concat } from 'rxjs/observable/concat';


/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/

@Component({
  selector: 'visita-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {

  /**
  * Contiene un elemento HTML que esta en la vista.
  * @type {ElementRef}
  */
  @ViewChild('seAtendio') seAtendio: ElementRef;

  /**
  * Contiene un elemento HTML que esta en la vista.
  * @type {ElementRef}
  */
  @ViewChild('noAtendio') noAtendio: ElementRef;
  
  /**
  * Contiene los datos del formulario que comunican a la vista con el componente.
  * @type {FormGroup}
  */
  dato: FormGroup;
  
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;
  
  /**
  * Contiene el tamaño del cuerpo del editor de texto para darle dormato al text area que esta en la vista.
  * @type {any}
  */
  CkeditorConfig = {
    height:document.body.clientHeight - 760
  }

  /**
  * Contiene las diferentes pestañas de acceso que puede tener la vista.
  * @type {number}
  */
  tab: number = 1;

  /**
  * Contiene la fecha de la visita.
  * @type {any}
  */
  fecha_visita: any = '';
  
  /**
  * Contiene las observaciones de la visita.
  * @type {any}
  */
  observaciones: any = '';

  /**
  * Bandera numerica si recibio o no atencion la paciente.
  * @type {number}
  */
  ReciboAtencion: number = 1;
  
  /**
  * Contiene el por que no recibio atencion la paciente.
  * @type {any}
  */
  porque: any = '';
  
  /**
  * Contiene la bandera si es detalle lo que se mostrara.
  * @type {boolean}
  */
  esDetalle:boolean = true;

  /**
  * variable que contiene el id seleccionado de la incidencia
  * @type {any}
  */
  id:  any = '';
  
  /**
  * variable que contiene la fecha de la visita para su detalle.
  * @type {any}
  */
  fecha_detalle:  any = '';
  
  /**
  * variable que contiene las observaciones de su detalle.
  * @type {any}
  */
  observaciones_detalle: any = '';

  /**
  * variable que contiene el por que no se atendio de su detalle.
  * @type {any}
  */
  porque_detalle: any = '';

  /**
  * variable que contiene si se atendio de su detalle.
  * @type {any}
  */
  seAtendio_detalle: any = '';
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(
            private router: Router,
            private route: ActivatedRoute,
            private crudService: CrudService,
            private fb: FormBuilder,
            private _sanitizer: DomSanitizer,
            private _el: ElementRef) { }
  

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number

    });

    this.dato = this.fb.group({

      id: [''],
      impresion_diagnostica: [''],
      motivo_ingreso: [''],
      estados_incidencias_id: [''],
      clues: [''],
      tieneReferencia: [''],

      pacientes: this.fb.array([
        this.fb.group({

          personas_id: [''],

          personas: this.fb.group({
            id: [''],
            nombre: [''],
            paterno: [''],
            materno: [''],
            domicilio: [''],
            fecha_nacimiento: [''],
            telefono: [''],

            estados_embarazos_id: [''],
            derechohabientes_id: [''],
            localidades_id: [''],
          }),
          acompaniantes: this.fb.array([
            this.fb.group({

              personas_id: [''],

              personas: this.fb.group({
                id: [''],
                nombre: [''],
                paterno: [''],
                materno: [''],
                domicilio: [''],
                fecha_nacimiento: [''],
                telefono: [''],

                estados_embarazos_id: [''],
                derechohabientes_id: [''],
                localidades_id: [''],
              }),
            }),
          ]),
        }),
      ]),

      altas_incidencias: this.fb.array([
        this.fb.group({
          id:[''],
          medico_reporta_id: [''],
          metodos_planificacion_id: [''],
          tipos_altas_id:[''],
          turnos_id:[''],
          diagnostico_egreso: [''],
          observacion_trabajo_social: [''],
          clues_contrarefiere:[''],
          clues_regresa:[''],
          resumen_clinico:[''],
          instrucciones_recomendaciones:[''],
          visitas_puerperales: this.fb.array([
            this.fb.group({
              id: [''],
              fecha_visita:  [''],
              observaciones: [''],
              seAtendio:[''],
              porque:[''],
            }),
          ]),
          multimedias: this.fb.group({
            img:this.fb.array([])
          }),
        }),
      ]),

    });

      //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
        //document.getElementById("catalogos").click();
  }
  /**
  * Este método cierra la modal de la visita
  * y limpia los datos.
  * @return void
  */
  cerrarModal() {
    this.fecha_visita = '';
    this.observaciones = '';
    this.porque = '';
    this.ReciboAtencion = 1;
    this.seAtendio.nativeElement.checked = false;
    this.noAtendio.nativeElement.checked = false;

    document.getElementById("visita").classList.remove('is-active');
  }

  /**
  * Este método abre la modal de una nueva visita
  * @return void
  */
  nueva_visita() {
    document.getElementById("visita").classList.add('is-active');
  }

  /**
  * Este método abre la ventana modal para validar la visita si
  * los datos son correctos.
  * @return void
  */
  validar_visita() {
    document.getElementById("visita_datos_vacios").classList.add('is-active');
  }

  /**
  * Este método muestra el detalle de la vista generada
  * @param data traer los datos a mostrar
  * @return void
  */
  detalle_visita(data) {


    this.fecha_detalle = data.created_at;
    this.observaciones_detalle = data.observaciones;
    this.porque_detalle = data.porque;
    this.seAtendio_detalle = data.seAtendio;





    document.getElementById("detalle_visita").classList.add('is-active');
  }

  /**
  * Este método cierra la ventana modal de la visita
  * @return void
  */
  cerrarModalDetalleVisita() {
    document.getElementById("detalle_visita").classList.remove('is-active');
  }

  /**
  * Este método cierra el detalle de la ventana modal
  * @param id traer el id de la vantana modal
  * @return void
  */
  cerrarModalDetalle(id) {
    document.getElementById(id).classList.remove('is-active');
  }

  /**
  * Este método abre el detalle de la ventana modal
  * @param id traer el id de la vantana modal
  * @return void
  */
  abrirModalDetalle(id) {
    document.getElementById(id).classList.add('is-active');
  }

  /**
  * Este método agrega una nueva visita puerperal
  * respecto los datos que hacen push al formulario reactivo.
  * valida los datos si estan llenos.
  * hace la asginacion de los catalogos que se carguen respecto a su id.
  * @return void
  */
  agregarVisita() {


    this.esDetalle = false;


    if(this.fecha_visita != "" && this.observaciones != ""){   
        
        
            var datoVisita = {
        
              id: [''],
        
              nuevo: [1],
              esQuitar: true,

              fecha_visita:  [this.fecha_visita, [Validators.required]],
              observaciones: [this.observaciones, [Validators.required]],
              seAtendio:[this.ReciboAtencion, [Validators.required]],
              porque:[this.porque],
                  

        
              //asignaciones a las variables que recorren el objeto para obtener sus valores        
            };

            //agrega al array de visitas_puerperales para que estos tengan valores respecto a sus variables en cada seguimiento que se le realice al paciente

            const visitas_puerperales: FormArray = <FormArray>this.dato.controls.altas_incidencias['controls'][0]['controls']['visitas_puerperales'];
            visitas_puerperales.push(this.fb.group(datoVisita));


            this.fecha_visita = '';
            this.observaciones = '';
            this.porque = '';
            this.ReciboAtencion = 1;
            this.seAtendio.nativeElement.checked = false;
            this.noAtendio.nativeElement.checked = false;
            this.cerrarModal();
      }else
      {
        this.validar_visita();
      }
  }

  /**
  * Este método asigna si recibio o no atencion la paciente
  * y activa un campo a espeficicar.
  * @return void
  */
  atencionVisita(){

    if(this.seAtendio.nativeElement.checked == true && this.noAtendio.nativeElement.checked == false){

      this.ReciboAtencion = 1;
      
    } else if (this.seAtendio.nativeElement.checked == false && this.noAtendio.nativeElement.checked == true) {

      this.ReciboAtencion = 0;
      
    }

  }

  /**
  * Este método que cierra la ventana modal de la validacion de los datos.
  * @return void
  */
  cerrarModalValidacionVisita() {
    document.getElementById("visita_datos_vacios").classList.remove('is-active');
  }

  /**
  * Este método carga los catalogos conectados al servicio
  * donde los parametros se los pasa la lista.
  * @param item elemento donde se almacenara
  * @param url url de la api donde se consulta y se pone el nombre exacto como esta en la api.
  * @return void
  */
  cargarCatalogo(item, url) {
    this.crudService.lista(0, 0, url).subscribe(
      resultado => {
        this[item] = resultado.data;
      },
      error => {
      }
    );
  }

  /**
  * Método donde se cargan los datos para actualizar
  * se actualiza por que agrega mas información a los arrays
  * de seguimiento, referencias y/o alta
  * @return void
  */
  actualizarDatos() {

    var json = this.dato.getRawValue();
    this.crudService.editar(this.id, json, 'visitas-puerperales').subscribe(
      resultado => {
      },
      error => {
      }
    )
  }

}