/**
* dependencias a utilizar
*/
import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule } from '@angular/forms';
import { CrudService } from '../../../../crud/crud.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";


import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { concat } from 'rxjs/observable/concat';

/**
* Contiene los datos que conectan a la API  de Google Maps
* para cargar el mapa.
* @type {any}
*/
declare var google: any;

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'seguimiento-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent implements OnInit {

  /**
  * Contiene un elemento HTML que esta en la vista.
  * @type {ElementRef}
  */
  @ViewChild('llevaControl') llevaControl: ElementRef;
  /**
  * Contiene un elemento HTML que esta en la vista.
  * @type {ElementRef}
  */
  @ViewChild('nollevaControl') nollevaControl: ElementRef;
  
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
   * **************************
   * Seccion de Referencia Mapa
   * **************************
  */
   
  /**
  * Contiene la latitud inicial a marcar en el mapa.
  * @type {any}
  */
  latInicial: any = 16.7569;

  /**
  * Contiene la longitud inicial a marcar en el mapa.
  * @type {any}
  */
  longInicial: any = -93.1292;

  /**
  * objeto que tiene latitud y longitud de origen que conecta a la api de google maps.
  * @type {number}
  */
  origin: number;

  /**
  * objeto que tiene latitud y longitud de destino que conecta a la api de google maps.
  * @type {number}
  */
  destination: number;

  /**
  * variable global para almacenar la latitud de origen a obtener de la Unidad Medica seleccionada.
  * @type {any}
  */
  latOrigen: any;

  /**
  * variable global para almacenar la longitud de origen a obtener de la Unidad Medica seleccionada.
  * @type {any}
  */
  longOrigen: any;

  /**
  * variable global para almacenar la latitud de destino a obtener de la Unidad Medica seleccionada.
  * @type {any}
  */
  latDestino: any;

  /**
  * variable global para almacenar la longitud de destino a obtener de la Unidad Medica seleccionada.
  * @type {any}
  */
  longDestino: any;

  /**
  * variable global que almacena la distnacia entre una Unidad Medica a Otra.
  * @type {any}
  */
  distancia: any = '';
  
  /**
  * variable global que almacena el tiempo entre una Unidad Medica a Otra.
  * @type {any}
  */
  tiempo: any = '';
  
  /**
  * variable global que almacena la descripcion de la carretera a marcar de una Unidad Medica a otra.
  * @type {any}
  */
  observaciones: any = '';

  /**
   * ********************
   * Seccion Seguimientos
   * ********************
  */

  /**
  * variable tipo bandera numerica para indicar que se esta agregando
  * un nuevo seguimiento.
  * @type {number}
  */
  nuevo: number;

  /**
  * variable que almacena la antiguedad del seguimiento
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  antiguedad:  any = '';
  
  /**
  * variable que tiene la información del medico
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  medico_reporta_id:  any = '';

  /**
  * variable que tiene la información de las indicaciones
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  indicaciones:  any = '';

  /**
  * variable que la información del Reporte Medico
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  reporte_medico:  any = '';

  /**
  * variable que la información del Reporte Medico
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  diagnostico_egreso:  any = '';

  /**
  * variable que la información del la Observacion de trabajo social
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */  
  observacion_trabajo_social:  any = '';

  /**
  * variable que contiene el id del Metodo de Planificación seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */  
  metodos_planificacion_id:  any = '';
  
  /**
  * variable que contiene el id del Estado de Incidencia
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */  
  estados_incidencias_id:  any = '';

  /**
  * variable que contiene el id de la Ubicación de Paciente seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  ubicaciones_pacientes_id:  any = '';

  /**
  * variable que contiene el id del Estado de Paciente
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  estados_pacientes_id:  any = '';

  /**
  * variable que contiene el id del Color Triage seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  triage_colores_id:  any = '';

  /**
  * variable que contiene el id del Diagnostico CIE-10 seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  subcategorias_cie10_id:  any = '';
  
  /**
  * variable que contiene el id del Turno seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  turnos_id:  any = '';
  
  /**
  * variable que contiene el Metodo de Planificación seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  metodos_planificacion:  any = '';

  /**
  * variable que contiene el Estado de Incidencia seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  estados_incidencias:  any = '';
  
  /**
  * variable que contiene el Estado de Paciente seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  estados_pacientes:  any = '';

  /**
  * variable que contiene la Ubicacion del Paciente seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  ubicaciones_pacientes:  any = '';
  
  /**
  * variable que contiene el Color Triage seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  triage_colores:  any = '';

  /**
  * variable que contiene diagnostico CIE-10 seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  subcategorias_cie10:  any = '';

  /**
  * variable que contiene el Turno seleccionado
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  turnos:  any = '';
  
  /**
  * variable que contiene el id seleccionado de la incidencia
  * @type {any}
  */
  id:  any = '';


  /**
   * ***********************
   * Detalle del seguimiento
   * ***********************
   */

  /**
  * variable que contiene la fecha del seguimiento
  * @type {any}
  */
  fecha:  any = '';
  
  /**
  * variable que contiene el nombre del medico que realiza el seguimiento
  * @type {any}
  */
  medico:  any = '';

  /**
  * variable que contiene las indicaciones que se realizan en el seguimiento
  * @type {any}
  */
  indi:  any = '';

  /**
  * variable que contiene las indicaciones que se realizan en el seguimiento
  * @type {any}
  */
  reporte:  any = '';

  /**
  * variable que contiene el estado de incidencia del seguimiento
  * @type {any}
  */
  estado_paciente:  any = '';

  /**
  * variable que contiene el estado folio de la incidencia
  * @type {any}
  */
  no_incidencia:  any = '';

  /**
  * variable que contiene el diagnostico cie-10 del detalle del seguimieto
  * @type {any}
  */
  sub_cie10:  any = '';
  
  /**
  * variable que contiene el color triage del seguimiento
  * @type {any}
  */
  color:  any = '';

  /**
  * variable que contiene el turno del seguimiento
  * @type {any}
  */
  turno:  any = '';

  /**
  * variable que contiene la ubicacion del seguimiento
  * @type {any}
  */
  ubicacion_paciente:  any = '';

  /**
   * ***********************
   * Detalle del seguimiento
   * ***********************
   */
  
  /**
  * variable que contiene el medico que autoriza la referencia
  * @type {any}
  */
  medico_refiere_id:  any = '';

  /**
  * variable que contiene el diagnostico de la referencia
  * @type {any}
  */
  diagnostico:  any = '';

  /**
  * variable que contiene el diagnostico de la referencia
  * @type {any}
  */
  resumen_clinico:  any = '';

  /**
  * variable que contiene la Unidad Medica de Origen de la referencia
  * @type {any}
  */
  clues_origen:  any = '';

  /**
  * variable que contiene la Unidad Medica de Destino de la referencia
  * @type {any}
  */
  clues_destino:  any = '';

  /**
  * variable que contiene la Unidad Medica donde este logueado el usuario
  * y se lleve acabo la referencia
  * @type {any}
  */
  clues_origen_login:  any = '';

  /**
  * variable que contiene el nombre de la Unidad Medica de destino
  * y se lleve acabo la referencia.
  * @type {any}
  */
  clues_destino_nombre: any = '';

  /**
  * variable que almacena las imagenes que tenga la referencia
  * @type {any}
  */
  img:any[] = [];

  /**
  * bandera que almacena si es informacion de detalle o no
  * en seguimientos, referencia y/o alta.
  * @type {any}
  */
  esDetalle:boolean = true;

   /**
   * ****************
   * Estado de Fuerza
   * ****************
   */

  /**
  * Arreglo donde almacena el estado de fuerza actualizado
  * de la Unidad Médica seleccionada en el autocomplet.
  * @type {any}
  */
  estado_fuerza_disponible = [];

  /**
  * Bandera para mostrar el estado de fuerza
  * de la Unidad Médica seleccionada en el autocomplet.
  * @type {any}
  */
  mostrar_estado_fuerza = false;

  /**
  * Bandera para mostrar que el estado de fuerza
  * a sido creado.
  * @type {any}
  */
  estado_fuerza_creado: any = '';

  /**
  * *******************************
  * Detalle de la Referencia creada
  * *******************************
  */

  /**
  * muestra el folio de la incidencia.
  * @type {any}
  */
  folio_referencia:  any = '';

  /**
  * muestra la Unidad Medica de Origen de la Referencia.
  * @type {any}
  */
  origen_referencia:  any = '';

  /**
  * muestra la Unidad Medica de Destino de la Referencia.
  * @type {any}
  */
  destino_referencia:  any = '';

  /**
  * muestra el diagnostico de la Referencia.
  * @type {any}
  */
  diagnostico_referencia:  any = '';

  /**
  * muestra el Resumen Clinico de la Referencia.
  * @type {any}
  */
  resumen_clinico_referencia:  any = '';

  /**
  * muestra las imagenes de la Referencia.
  * @type {any}
  */
  img_referencia:  any = '';

  /**
  * muestra el Reporte Medico de la Referencia.
  * @type {any}
  */
  medico_reporta_referencia:  any = '';
  

  /**
  * *******************************
  * Detalle de la Referencia creada
  * *******************************
  */

  /**
  * variable que almacena la fecha del alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  fecha_alta: any = '';
  
  /**
  * variable que almacena el tipo alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  tipos_altas:  any = '';

  /**
  * variable que almacena el id del turno del alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  tur_id:  any = '';

  /**
  * variable que almacena el turno en que se realiza el alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  tur:  any = '';

  /**
  * variable que almacena el metodo de planificacion que tiene el alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */
  me_planificacion:  any = '';

  /**
  * variable que almacena el id del metodo de planificacion que tiene el alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */  
  me_planificacion_id:  any = '';

  /**
  * variable que almacena el tipo de alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  t_altas:  any = '';

  /**
  * variable que almacena el id del tipo de alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  t_altas_id:  any = '';

  /**
  * variable que almacena la Unidad Medica a donde regresa el Paciente en su alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  clues_regresa:  any = '';

  /**
  * variable que almacena la Unidad Medica a donde regresa el Paciente en su alta.
  * al realizar el push en la vista respecto a su ngModel
  * @type {any}
  */ 
  clues_contrarefiere:  any = '';

  /**
  * variable que almacena el nombre de la Unidad Medica a mostrar en la vista.
  * @type {any}
  */ 
  clues_contrareferencia: any = '';

  /**
  * variable que almacena las imagenes adjuntadas en el alta.
  * @type {any}
  */ 
  imgalta:any[] = [];

  /**
  * variable que almacena el resumen clinico del alta.
  * @type {any}
  */ 
  r_clinico:  any = '';

  /**
  * variable que almacena las instrucciones y recomendaciones del alta.
  * @type {any}
  */
  i_recomendaciones:  any = '';

  /**
  * variable que almacena el diagnostico de egreso del alta.
  * @type {any}
  */
  diagnostico_ingreso:  any = '';

  /**
  * variable que almacena el medico que reporta el alta.
  * @type {any}
  */
  me_reporta:  any = '';

  /**
  * variable que almacena el id del medico que reporta el alta.
  * @type {any}
  */
  me_reporta_id:  any = '';

  /**
  * variable que almacena el codigo cie-10 del detalle del seguimiento.
  * @type {any}
  */
  cie10:  any = '';

  /**
  * variable que almacena el diagnostico cie-10 del detalle del seguimiento.
  * @type {any}
  */
  cie10_codigo:  any = '';

  //detalle alta

  /**
  * variable que almacena la unidad medica donde se encuentre el paciente.
  * @type {any}
  */
  clues_contrarefiere_alta:  any = '';
  
  /**
  * variable que almacena la unidad medica donde se regresara el paciente.
  * @type {any}
  */
  clues_regresa_alta:  any = '';

  /**
  * variable que almacena el turno en el que se genero el alta.
  * @type {any}
  */
  turno_alta:  any = '';
  
  /**
  * variable que almacena el turno en el que se genero el alta.
  * @type {any}
  */
  tipo_alta:  any = '';
  
  /**
  * variable que almacena el medico que autoriza el alta.
  * @type {any}
  */
  medico_alta:  any = '';

  /**
  * variable que almacena las imagenes que se generaron en el alta.
  * @type {any}
  */
  img_alta:  any = '';

  /**
  * variable que almacena el metodo de planificacion del alta.
  * @type {any}
  */
  metodos_planificacion_alta:  any = '';

  /**
  * variable que almacena las observaciones al generar el alta.
  * @type {any}
  */
  observaciones_ts_alta:  any = '';

  /**
  * variable que almacena resumen clinico del alta.
  * @type {any}
  */
  resumen_alta:  any = '';

  /**
  * variable que almacena las instrucciones del alta.
  * @type {any}
  */
  instrucciones_alta:  any = '';
  
  /**
  * variable que almacena las observaciones de trabajo social en el alta.
  * @type {any}
  */
  diagnostico_alta:  any = '';

  /**
  * variable que hace referencia a las imagenes de la vista.
  * @type {any}
  */
  data: any = '';



  /**
  * Variable que conecta con la URL de la API, para traer el directorio de medicos en un Autocomplet que tiene la Vista.
  * si se desea agregar.
  * @type {string}
  */
  //public medicos_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;
  
  /**
  * Variable que conecta con la URL de la API, para traer los Diagnosticos CIE-10 en un Autocomplet que tiene la Vista.
  * @type {string}
  */
  public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

  /**
  * Variable que conecta con la URL de la API, para traer el Estado de Fuerza en un Autocomplet que tiene la Vista.
  * @type {string}
  */
  public clues_estado_fuerza: string = `${environment.API_URL}/clues-fuerza-auto?term=:keyword`;
  
  /**
  * Variable que conecta con la URL de la API, para traer Unidades Medicas en un Autocomplet que tiene la Vista.
  * @type {string}
  */
  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;
  
  /**
  * almacena las imagenes cargadas de acuerdo a una referencia nueva.
  * @type {any}
  */
  public url_img_referencias: string = `${environment.API_PATH}/public/adjunto/referencias/`;


  /**
  * almacena las imagenes cargadas de acuerdo a una alta nueva.
  * @type {any}
  */
  public url_img_altas: string = `${environment.API_PATH}/adjunto/contrareferencias/`;

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

    this.clues_contrarefiere = JSON.parse(localStorage.getItem("clues"));

    this.clues_origen_login = JSON.parse(localStorage.getItem("clues"));


    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number

    });



    this.dato = this.fb.group({

      id: [''],
      impresion_diagnostica: [''],
      motivo_ingreso: [''],
      estados_incidencias_id: [''],
      clues: [''],
      clues_actual: [''],
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

      movimientos_incidencias: this.fb.array([
        this.fb.group({
          
          id:[''],
          diagnostico_egreso: [''],
          estados_incidencias_id: [''],
          estados_pacientes_id: [''],
          incidencias_id: [''],
          indicaciones: [''],
          medico_reporta_id: [''],
          metodos_planificacion_id: [''],
          observacion_trabajo_social: [''],
          reporte_medico: [''],
          subcategorias_cie10_id: [''],
          triage_colores_id: [''],
          ubicaciones_pacientes_id: [''],
          turnos_id: [''],

        }),

      ]),

      referencias: this.fb.array([
        this.fb.group({

          clues_origen: [''],
          clues_origen_o: [''],
          clues_destino: [''],
          clues_destino_o: [''],
          diagnostico: [''],
          esIngreso: [0],
          validar: [],
          multimedias: this.fb.group({
            img:this.fb.array([])
          }),
          medico_refiere_id: [''],
          resumen_clinico: [''],
          esQuitar: []
        }),
      ]),

      altas_incidencias: this.fb.array([
        this.fb.group({
          id: [''],
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
          multimedias: this.fb.group({
            img:this.fb.array([])
          }),
        }),
      ]),

    });
 
    

      //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>

      setTimeout(() => {
        document.getElementById("catalogoSeguimiento").click();
      }, 200);
    
      setTimeout(() => {
        document.getElementById("catalogosAlta").click();
      }, 200);

      //console.log("dato",this.dato.controls.referencias['controls'][0]['controls']['clues_destino']);


    
  }

  /**
  * Este método cierra la ventana modal de un seguimiento
  * y limpia sus datos.
  * @return void
  */
  cerrarModal() {
    this.ubicaciones_pacientes_id = '';
    this.estados_pacientes_id = '';
    this.triage_colores_id = '';
    this.indicaciones = '';
    this.reporte_medico = '';
    this.medico_reporta_id = '';
    this.turnos_id = '';
    this.subcategorias_cie10_id = "";
    document.getElementById("nuevo_seguimiento").classList.remove('is-active');
  }
  /**
  * Este método abre la ventana modal de un seguimiento
  * y limpia sus datos.
  * @return void
  */
  nuevo_seguimiento() {
    document.getElementById("nuevo_seguimiento").classList.add('is-active');
  }

  /**
  * Este método abre una ventana modal de campos vacios
  * al agregar un nuevo seguimiento.
  * @return void
  */
  validar_seguimiento() {
    document.getElementById("seguimiento_datos_vacios").classList.add('is-active');
  }

  /**
  * Este método muestra el detalle del seguimiento agregado
  * @param data traer los datos a mostrar
  * @return void
  */
  detalle_seguimiento(data): void {

    this.fecha = data.created_at;
    this.indi = data.indicaciones;
    this.reporte = data.reporte_medico;
    this.estado_paciente = data.estados_pacientes.nombre;
    this.no_incidencia = data.incidencias_id;
    this.sub_cie10 = data.subcategorias_cie10.nombre;
    this.color = data.triage_colores.nombre;
    this.turno = data.turnos.nombre;
    this.ubicacion_paciente = data.ubicaciones_pacientes.nombre;
    this.medico = data.medico_reporta_id;
    this.tur = data.turnos.nombre;
    this.cie10 = data.subcategorias_cie10.nombre;
    this.cie10_codigo = data.subcategorias_cie10.codigo;

    document.getElementById("detalle_seguimiento").classList.add('is-active');
  }

  /**
  * Este método cierra una ventana modal del detalle del seguimiento.
  * @return void
  */
  cerrarModalDetalleSeguimiento() {
    document.getElementById("detalle_seguimiento").classList.remove('is-active');
  }

  /**
  * Este método cierra la ventana modal de un nuevo seguimiento
  * @return void
  */
  cerrarModalDetalle(id) {
    document.getElementById(id).classList.remove('is-active');
  }

  /**
  * Este método abre la ventana modal de las imagenes en alta y referencia
  * @return void
  */
  abrirModalDetalle(id) {
    document.getElementById(id).classList.add('is-active');
  }

  /**
  * Este método agrega un nuevo seguimiento
  * respecto los datos que hacen push al formulario reactivo.
  * valida los datos si estan llenos.
  * hace la asginacion de los catalogos que se carguen respecto a su id.
  * @return void
  */
  agregarSeguimiento() {

    this.esDetalle = false;

    if(this.turnos_id != "" && this.ubicaciones_pacientes_id != ""
    && this.estados_pacientes_id != "" && this.triage_colores_id != ""
    && this.medico_reporta_id != "" && this.subcategorias_cie10_id !=""
    && this.indicaciones != "" && this.reporte_medico != ""){



          var tcp = 0;
          for (let item of this.triage_colores) {
            if (this.triage_colores_id == item.id)
              break;
            tcp++;
          };
      
          var ep = 0;
          for (let item of this.estados_pacientes) {
            if (this.estados_pacientes_id == item.id)
              break;
            ep++;
          };
      
          var up = 0;
          for (let item of this.ubicaciones_pacientes) {
            if (this.ubicaciones_pacientes_id == item.id)
              break;
            up++;
      
          };
      
          var tur = 0;
          if (this.turnos)
            for (let item of this.turnos) {
              if (this.turnos_id == item.id)
                break;
              tur++;
            };
      
          var sci10 = 0;
          if (this.subcategorias_cie10)
            for (let item of this.subcategorias_cie10) {
              if (this.subcategorias_cie10_id == item.id)
                break;
              sci10++;
            };
      
      
      
          var datomodal = {
      
            id: [''],
      
            nuevo: [1, [Validators.required]],

            esQuitar: true,
                  
            turnos: [this.turnos[tur], [Validators.required]],
            turnos_id: [this.turnos_id, [Validators.required]],
      
            ubicaciones_pacientes: [this.ubicaciones_pacientes[up], [Validators.required]],
            ubicaciones_pacientes_id: [this.ubicaciones_pacientes_id, [Validators.required]],
      
            estados_pacientes: [this.estados_pacientes[ep], [Validators.required]],
            estados_pacientes_id: [this.estados_pacientes_id, [Validators.required]],
      
            triage_colores: [this.triage_colores[tcp], [Validators.required]],
            triage_colores_id: [this.triage_colores_id, [Validators.required]],
      
            medico_reporta_id: [this.medico_reporta_id, [Validators.required]],
      
            subcategorias_cie10_id: [this.subcategorias_cie10_id.id, [Validators.required]],
            subcategorias_cie10: [this.subcategorias_cie10[sci10], [Validators.required]],
      
            indicaciones: [this.indicaciones, [Validators.required]],
            reporte_medico: [this.reporte_medico, [Validators.required]],
      
            //asignaciones a las variables que recorren el objeto para obtener sus valores        
          };
      
      
      
          if (this.subcategorias_cie10)
            datomodal["subcategorias_cie10"] = this.subcategorias_cie10[sci10];
          if (this.turnos)
            datomodal["turnos"] = this.turnos[tur];
      
      
      
          //agrega al array de movimientos_incidencias para que estos tengan valores respecto a sus variables en cada seguimiento que se le realice al paciente

      
          const mv: FormArray = <FormArray>this.dato.controls.movimientos_incidencias;
      
          mv.push(this.fb.group(datomodal));
      
          //asigna el estado de incidencia en proceso con numero 2
          this.dato.controls['estados_incidencias_id'].setValue(2);
          this.dato.controls['tieneReferencia'].setValue(0);
      
      
      
          this.ubicaciones_pacientes_id = '';
          this.estados_pacientes_id = '';
          this.triage_colores_id = '';
          this.indicaciones = '';
          this.reporte_medico = '';
          this.medico_reporta_id = '';
          this.turnos_id = '';
          this.subcategorias_cie10_id = '';
          this.cerrarModal();

    }else
    {
      this.validar_seguimiento();
    }
  }

  /**
  * Este método cierra la ventana modal de la validacion de un nuevo seguimiento.
  * @return void
  */
  cerrarModalValidacionSeguimiento() {
    document.getElementById("seguimiento_datos_vacios").classList.remove('is-active');
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
  * Este método autocomplet donde se obtienen los datos del medico que se este buscando
  * @param data donde se obtienes los datos de la busqueda
  * @return void
  */
  autocompleMedicos = (data: any) => {

    let html = `<span>${data.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
  * Método para obtener el valor del medico
  * @param data contiene el valor del medico
  * @return void
  */
  valorFormato_medico(data: any) {

    let html = `(${data.id}) - ${data.nombre}`;
    return html;
  }

  /**
  * Este método autocomplet donde se obtienen los datos del diagnostico CIE-10 que se este buscando
  * @param data donde se obtienes los datos de la busqueda
  * @return void
  */
  autocompleFormatoSubcategoriasCIE10 = (data: any) => {

    let html = `<span> ${data.codigo} - ${data.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
  * Método para obtener el valor del diagnostico CIE-10
  * @param data contiene el valor deL diagnostico CIE-10
  * @return void
  */
  valorFormato_SubcategoriasCIE10(data: any) {

    let html = `${data.nombre}`;
    return html;
  }

  /**
  * Método donde se cargan los datos para actualizar
  * se actualiza por que agrega mas información a los arrays
  * de seguimiento, referencias y/o alta
  * @return void
  */
  actualizarDatos() {

    var json = this.dato.getRawValue();
    this.crudService.editar(this.id, json, 'incidencias').subscribe(
      resultado => {
      },
      error => {
      }
    )
  }





  ////////////////// referencias///////////////////////////////////////

  /**
  * Método abre con los datos el detalle de la referencia
  * @return void
  */
  detalle_referencia(data): void {

    this.folio_referencia = data.incidencias_id;
    this.origen_referencia = '('+data.clues_origen+')'+ " - "+ data.clues_origen_o.nombre;
    this.destino_referencia = '('+data.clues_destino+')'+ " - "+  data.clues_destino_o.nombre;
    this.img_referencia = data.multimedias;
    this.medico_reporta_referencia = data.medico_refiere_id;
    this.diagnostico_referencia = data.diagnostico;
    this.resumen_clinico_referencia = data.resumen_clinico;




    document.getElementById("detalle_referencia").classList.add('is-active');
  }
  
  /**
  * Método cierra la ventana modal del detalle de la referencia
  * @return void
  */
  cerrarModalDetalleReferencia() {
    document.getElementById("detalle_referencia").classList.remove('is-active');
  }

  /**
  * Método carga las imagenes selccionadas en la vista
  * @param evt Evento change del campo file
  * @param Modelo donde guardaremos la cadena en base64 de la imagen
  * @param bandera que determina si el campo es multiple
  * @param index indice de la imagen a obtener
  * @return void
  */
  error_archivo = false;
  seleccionarImagenBase64(evt, modelo, multiple: boolean = false, index: number = 0) {

    var files = evt.target.files;
    var esto = this;
    esto.error_archivo = false;
    if (!multiple) {
      var file = files[0];
      if (files && file) {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (function (theFile) {
          return function (e) {
            try {
              modelo.patchValue(btoa(e.target.result));
            } catch (ex) {
              esto.error_archivo = true;
            }
          }
        })(file);
      }
    }
    else {
      var objeto = [];
      for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        reader.onload = (function (theFile) {
          return function (e) {
            try {
              modelo.push(
                          {
                            foto: btoa(e.target.result),
                            es_url:false
                          }
                        );

            } catch (ex) {
              esto.error_archivo = true;
            }
          }
        })(f);
      }
    }
  }
  
  /**
  * Método que abre una ventana modal para validar la referencia
  * @return void
  */
  validar_referencia() {
    document.getElementById("referencia_datos_vacios").classList.add('is-active');
  }

  /**
  * Método que abre una ventana modal para agregar una nueva referencia
  * @return void
  */
  agregarReferencia() {
    
    this.esDetalle = false;


    if(this.medico_refiere_id != "" && this.diagnostico !="" && this.resumen_clinico !="" && this.clues_destino != ""){
  
        var datoReferencia = {
    
          nuevo: [1, [Validators.required]],
          
          esQuitar: true,
    
          medico_refiere_id: [this.medico_refiere_id, [Validators.required]],
          diagnostico: [this.diagnostico, [Validators.required]],
          resumen_clinico: [this.resumen_clinico, [Validators.required]],
    
          clues_origen: [this.clues_origen_login.clues, [Validators.required]],
          clues_destino: [this.clues_destino.clues, [Validators.required]],

          clues_origen_o: [this.clues_origen_login.nombre, [Validators.required]],
          clues_destino_o: [this.clues_destino_nombre, [Validators.required]],
    
          multimedias: this.fb.group({
            img:this.fb.array(this.img)
          }),
    
          esIngreso: [0],

          validar: [true]

        };

        console.log(datoReferencia);
    
    
    
        const mv: FormArray = <FormArray>this.dato.controls.referencias;
        mv.push(this.fb.group(datoReferencia));


    
        //asigna el estado de incidencia en proceso con numero 2
        this.dato.controls['estados_incidencias_id'].setValue(4);
        this.dato.controls['tieneReferencia'].setValue(1);
    
        this.medico_refiere_id = '';
        this.diagnostico = '';
        this.resumen_clinico = '';
        this.clues_destino = '';
        this.img = [];
        this.estado_fuerza_disponible = [];
        this.mostrar_estado_fuerza = false;
        // const botonBorrar = <FormArray>this.dato.controls.referencias['controls'][this.dato.controls.referencias['controls'].length -1]['controls']['esQuitar'];

        // botonBorrar.setValue(1);
        this.cerrarModalReferencia();
        
      
      }
      else{
        this.validar_referencia();
      }
  }

  /**
  * Método que cierra una ventana modal para validar la referencia
  * @return void
  */
  cerrarModalValidacionReferencia() {
    document.getElementById("referencia_datos_vacios").classList.remove('is-active');
  }

  /**
  * Método que carga el mapa para realizar una referencia
  * y realizar el trazado de la ruta de acuerdo a la Unidad Medica de Origen y Destino.
  * @return void
  */
  cargarMapa() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: parseFloat(this.latInicial), lng: parseFloat(this.longInicial) }
    });
    directionsDisplay.setMap(map);

    (<HTMLInputElement>document.getElementById('tiempo_traslado')).value = "";
    (<HTMLInputElement>document.getElementById('distancia_traslado')).value = "";
    (<HTMLInputElement>document.getElementById('observaciones')).value = "";

  }

  /**
  * Este método toma el calulo de 2 punto para dibujarlos en el mapa
  * @return void
  */
  calcularOrigenDestino(directionsService, directionsDisplay) {

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: this.latInicial, lng: this.longInicial }
    });

    directionsService.route({
      origin: { lat: parseFloat(this.latOrigen), lng: parseFloat(this.longOrigen) },
      destination: { lat: parseFloat(this.latDestino), lng: parseFloat(this.longDestino) },
      //waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'

    },
      (response, status) => {
        if (status === 'OK') {
          // se asignan los valores de tiempo, distancia y el tramo carretero a seguir. estos datos los provee la API de GoogleMaps
          this.tiempo = response.routes[0].legs[0].duration.text;
          this.distancia = response.routes[0].legs[0].distance.text;
          this.observaciones = response.routes[0].summary;

          (<HTMLInputElement>document.getElementById('tiempo_traslado')).value = this.tiempo;
          (<HTMLInputElement>document.getElementById('distancia_traslado')).value = this.distancia;
          (<HTMLInputElement>document.getElementById('observaciones')).value = this.observaciones;

          directionsDisplay.setDirections(response);

        } else {
          //si el estatus no es OK mandara un mensaje de alerta mas el status que nos indique la API de GoogleMaps
          window.alert('Directions request failed due to ' + status);
        }
      });
  }
  
  /**
  * Este método obtiene los datos del autocomplet de la unidad medica de origen
  * y el envio de datos a las variables del formulario reactivo
  * @return void
  */
  select_origen_autocomplete(clues_origen_login, latOrigen: any, longOrigen: any) {

    this.latOrigen = clues_origen_login.numeroLatitud;
    this.longOrigen = clues_origen_login.numeroLongitud;

  }

  /**
  * Este método obtiene los datos del autocomplet de la unidad medica de destino
  * y el envio de datos a las variables del formulario reactivo
  * @return void
  */
  select_destino_autocomplete(data, latDestino: any, longDestino: any) {

    this.latDestino = data.numeroLatitud;
    this.longDestino = data.numeroLongitud;

    this.select_origen_autocomplete(this.clues_origen_login, this.latOrigen, this.longOrigen);
    this.trazarRuta();

    this.mostrar_estado_fuerza = true;
     
  }
  
  /**
  * Este método obtiene los datos del autocomplet de la unidad medica donde se busca su estado de fuerza actualizado
  * y el envio de datos a las variables del formulario reactivo
  * @param modelo Nombre del modelo donde se guarda el dato obtenido
  * @param item nombre del item a extraer del objeto
  * @param datos objeto donde se busca el elemento para su extraccion del boton ver estado de fuerza
  * @param esmodelo Bandera que determina si el modelo es un formGroup 
  * @return void
  */
  select_destino_estado_fuerza_autocomplete(modelo, item, datos, esmodelo: boolean) {
      this.estado_fuerza_disponible = [];
      this.estado_fuerza_creado = '';
      
      if (!esmodelo)
          modelo = datos[item];
          this.clues_destino_nombre = datos.nombre;

      if(datos.estado_fuerza.cartera_servicios){
        if( datos.estado_fuerza.cartera_servicios != ''){

          this.estado_fuerza_creado = datos.estado_fuerza.created_at;
          this.estado_fuerza_disponible.push(datos.estado_fuerza.cartera_servicios);

        }
      }    
    }

    /**
    * Este método realiza el trazo de la ruta teniendo los datos 
    * de la unidad medica, latitud y longitud
    * @return void
    */
    trazarRuta() {

      if (this.latOrigen && this.longOrigen && this.latDestino && this.longDestino) {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        this.calcularOrigenDestino(directionsService, directionsDisplay);
        var map = new google.maps.Map(document.getElementById('map'), {
        });
        directionsDisplay.setMap(map);

      }
    }

    /**
    * Este método obtiene los datos del formulario reactivo
    * para asignarlo a las variables globales de longitudes y latitudes
    * al momento de editar la ruta ya creada
    * @return void
    */
    datosCargados() {

      this.latOrigen = this.dato.controls.numeroLatitud_origen.value;
      this.longOrigen = this.dato.controls.numeroLongitud_origen.value;
      this.latDestino = this.dato.controls.numeroLatitud_destino.value;
      this.longDestino = this.dato.controls.numeroLongitud_destino.value;
      this.trazarRuta();
    }

    /**
    * Este método cierra la ventana modal de la referencia y limpia los datos
    * @return void
    */
    cerrarModalReferencia() {
      this.medico_refiere_id = '';
      this.diagnostico = '';
      this.resumen_clinico = '';
      this.clues_destino = '';
      this.img = [];
      this.estado_fuerza_disponible = [];
      this.mostrar_estado_fuerza = false;
      document.getElementById("referencia").classList.remove('is-active');
    }

    /**
    * Este método abre la ventana modal para una nueva referencia
    * @return void
    */
    nueva_referencia() {
      document.getElementById("referencia").classList.add('is-active');
      //(<HTMLInputElement>document.getElementById('clues_origen')).value = "("+this.clues_origen_login.clues+")"+" "+this.clues_origen_login.nombre;
    }

    /**
    * Método para listar Unidades Medicas en el Autocomplet
    * @param data contiene los elementos que se escriban en el input del Autocomplet
    */
    autocompleListFormatter = (data: any) => {

      let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    /**
    * Método para obtener el valor de la Unidad Medica de origen
    * @param data contiene el valor de la Unidad Medica de origen
    * @return void
    */
    valorFormato_origen(data: any) {

      let html = `(${data.clues}) - ${data.nombre}`;
      return html;
    }

    /**
    * Método para obtener el valor de la Unidad Medica de destino
    * @param data contiene el valor de la Unidad Medica de destino
    * @return void
    */
    valorFormato_destino(data: any) {

      let html = `(${data.clues}) ${data.nombre}`;
      return html;
    }


    //////////////////////////////Alta////////////////////////////////////
    /**
    * Método para obtener el valor de la Unidad Medica de destino
    * @param data contiene el valor de la Unidad Medica de destino
    * @return void
    */
    valorFormato_contrareferencia(data: any) {
      
          let html = `(${data.clues}) - ${data.nombre}`;
          return html;
    }

    /**
    * Método para listar Unidades Medicas en el Autocomplet
    * @param data contiene los elementos que se escriban en el input del Autocomplet
    */
    autocompleListFormatterRegresa = (data: any) => {
      
      let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    /**
    * Método para obtener el valor de la Unidad Medica de destino
    * @param data contiene el valor de la Unidad Medica de destino
    * @return void
    */
    valorFormato_regresa(data: any) {

      let html = `(${data.clues}) - ${data.nombre}`;
      return html;
    }
    /**
    * Este método quita o elimina un elemento de un array
    * @param modelo Nombre del modelo donde se guarda el dato obtenido
    * @param i Posicion del elemento a eliminar
    * @return void
    */
    quitar_form_array(modelo, i: number) {
      modelo.splice(i, 1);
      //modelo.removeAt(i);
    }

    /**
    * Este método genera la ventana modal para ver el detalle del alta.
    * @param data tiene los datos a mostrar
    * @return void
    */
    detalle_alta(data): void {

      this.fecha_alta = data.created_at;
      this.folio_referencia = data.incidencias_id;
      this.medico_alta = data.medico_reporta_id;
      this.img_alta = data.multimedias;
      this.clues_contrarefiere_alta = '('+data.clues_contrarefiere+')'+ " - "+data.clues_contrarefiere_o.nombre;
      this.clues_regresa_alta = '('+data.clues_regresa+')'+ " - "+data.clues_regresa_o.nombre;
      this.turno_alta = data.turnos.nombre;
      this.tipo_alta = data.tipos_altas.nombre;
      this.resumen_alta = data.resumen_clinico;
      this.diagnostico_alta = data.diagnostico_egreso;
      this.metodos_planificacion_alta = data.metodos_planificacion.nombre;
      this.observaciones_ts_alta = data.observacion_trabajo_social;
      this.instrucciones_alta = data.instrucciones_recomendaciones;

      document.getElementById("detalle_alta").classList.add('is-active');
    }

    /**
    * Este método cierra la ventana modal del detalle del alta.
    * @return void
    */
    cerrarModalDetalleAlta() {
      document.getElementById("detalle_alta").classList.remove('is-active');
    }

    /**
    * Este método cierra la ventana modal de agregar una nueva alta.
    * @return void
    */
    cerrarModalAlta() {
      this.clues_regresa = '';
      this.t_altas_id = '';
      this.tur_id = '';
      this.me_reporta_id = '';
      this.r_clinico = '';
      this.diagnostico_egreso = '';
      this.observacion_trabajo_social = '';
      this.me_planificacion_id = '';
      this.i_recomendaciones = '';
      this.imgalta = [];
      
      document.getElementById("alta").classList.remove('is-active');

    }

    /**
    * Este método abre la ventana modal para agregar una nueva alta.
    * @return void
    */
    nueva_alta() {
      document.getElementById("alta").classList.add('is-active');
      (<HTMLInputElement>document.getElementById('contrareferencia')).value = "("+this.clues_contrarefiere.clues+")"+" - "+this.clues_contrarefiere.nombre;
    }

    /**
    * Este método cierra la ventana modal de un alta.
    * @return void
    */
    cancelarModal(id) {
      document.getElementById(id).classList.remove('is-active');
    }

    /**
    * Este método abre la ventana modal de un alta.
    * @return void
    */
    abrirModal(id) {
      document.getElementById(id).classList.add('is-active');
    }

    /**
    * Este método abre la ventana modal de un alta si los datos no son validos.
    * @return void
    */
    validar_alta() {
      document.getElementById("alta_datos_vacios").classList.add('is-active');
    }

    /**
    * Este método agrega una nueva alta.
    * @return void
    */
    agregarAlta() {

      this.esDetalle = false;

      if(this.clues_regresa !="" && this.tur_id !="" && this.t_altas_id !="" && this.me_reporta_id !=""
        && this.r_clinico !="" &&  this.diagnostico_egreso !="" && this.me_planificacion_id !="" && this.observacion_trabajo_social !=""
        && this.i_recomendaciones !=""){


          var ta = 0;
          for (let item of this.tipos_altas) {
            if (this.t_altas_id == item.id)
              break;
            ta++;
          };
      
          var mp = 0;
          for (let item of this.metodos_planificacion) {
            if (this.me_planificacion_id == item.id)
              break;
            mp++;
          };
      
          var tur = 0;
          for (let item of this.turnos) {
            if (this.tur_id == item.id)
              break;
            tur++;
          };
      
          
      
          var datoAlta = {
      
            nuevo: [1, [Validators.required]],
            
            esQuitar: true,
      
            multimedias: this.fb.group({
              img:this.fb.array(this.imgalta)
            }),
            
            medico_reporta_id: [this.me_reporta_id, [Validators.required]],
      
            turnos: [this.turnos[tur], [Validators.required]],
            turnos_id: [this.tur_id, [Validators.required]],
            
            tipos_altas: [this.tipos_altas[ta], [Validators.required]],
            tipos_altas_id: [this.t_altas_id, [Validators.required]],
      
            diagnostico_egreso: [this.diagnostico_egreso, [Validators.required]],
            observacion_trabajo_social: [this.observacion_trabajo_social, [Validators.required]],
            clues_contrarefiere: [this.clues_contrarefiere.clues, [Validators.required]],
            clues_regresa: [this.clues_regresa.clues, [Validators.required]],
            resumen_clinico:[this.r_clinico, [Validators.required]],
            //diagnostico_ingreso:[this.diagnostico_ingreso,[Validators.required]],
            instrucciones_recomendaciones:[this.i_recomendaciones, [Validators.required]],
            metodos_planificacion: [this.metodos_planificacion[mp], [Validators.required]],
            metodos_planificacion_id: [this.me_planificacion_id, [Validators.required]],
      
          };

          if(this.llevaControl.nativeElement.checked == true){

            this.dato.controls['estados_incidencias_id'].setValue(5);
          }
          else{
            this.dato.controls['estados_incidencias_id'].setValue(3);
          }

          
      
      
      
          const mv: FormArray = <FormArray>this.dato.controls.altas_incidencias;
          mv.push(this.fb.group(datoAlta));

          console.log(this.dato.value);
          
          
          const ref: FormArray = <FormArray>this.dato.controls.referencias;
      
          if(ref.length > 0){
      
            this.dato.controls['tieneReferencia'].setValue(1);
      
          }else{
            this.dato.controls['tieneReferencia'].setValue(0);
          }

        

          
            
            
      

          

      
          this.clues_regresa = '';
          this.t_altas_id = '';
          this.tur_id = '';
          this.me_reporta_id = '';
          this.r_clinico = '';
          this.diagnostico_egreso = '';
          this.observacion_trabajo_social = '';
          this.me_planificacion_id = '';
          this.i_recomendaciones = '';
          this.imgalta = [];
          this.llevaControl.nativeElement = '';
          this.nollevaControl.nativeElement = '';
      
          this.cerrarModalAlta();
      
        }
        else{
          this.validar_alta();
        }

    }

    /**
    * Este método cierra la validacion de un alta.
    * @return void
    */
    cerrarModalValidacionAlta() {
      document.getElementById("alta_datos_vacios").classList.remove('is-active');
    }

    //ESTADO DE FUERZA
    /**
    * Este método abre una ventana modal para ver el estado de fuerza.
    * @return void
    */
    verEstadoFuerza(){
      document.getElementById("estado_fuerza").classList.add('is-active');
    }

    /**
    * Este método cierra una ventana modal del estado de fuerza.
    * @return void
    */
    cerrarModalEstadoFuerza() {
      document.getElementById("estado_fuerza").classList.remove('is-active');
    }

}