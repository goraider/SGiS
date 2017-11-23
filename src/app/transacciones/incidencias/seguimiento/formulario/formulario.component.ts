import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { CrudService } from '../../../../crud/crud.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { concat } from 'rxjs/observable/concat';


declare var google: any;
//declare var Pusher: any;


@Component({
  selector: 'seguimiento-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {
  
  dato: FormGroup;
  tamano = document.body.clientHeight;
  personas: any;
  tab: number = 1;

  latInicial: any = 16.7569;
  longInicial: any = -93.1292;

  origin: number;
  destination: number;

  latOrigen: any;
  longOrigen: any;

  latDestino: any;
  longDestino: any;

  distancia: any = '';
  tiempo: any = '';
  observaciones: any = '';


  //Seguimiento
  nuevo;
  antiguedad;
  medico_reporta_id;
  incidencias_id;
  indicaciones;
  reporte_medico;
  diagnostico_egreso;
  observacion_trabajo_social;
  metodos_planificacion_id;
  estados_incidencias_id;

  ubicaciones_pacientes_id;
  estados_pacientes_id;
  triage_colores_id;
  subcategorias_cie10_id;
  turnos_id;

  metodos_planificacion;
  estados_incidencias;
  estados_pacientes;
  ubicaciones_pacientes;
  triage_colores;
  subcategorias_cie10;
  turnos;
  id;

  //detalle seguimiento
  fecha;
  medico;
  indi;
  reporte;
  estado_paciente;
  no_incidencia;
  sub_cie10;
  color;
  turno;
  ubicacion_paciente;

  //referencia
  medico_refiere_id;
  diagnostico;
  resumen_clinico;
  clues_origen;
  clues_destino;

  //detalle referencia
  folio_referencia;
  origen_referencia;
  destino_referencia;
  diagnostico_referencia;
  resumen_clinico_referencia;
  img_referencia;
  medico_reporta_referencia;

  //Alta
  tipos_altas
  tur_id;
  tur;
  me_planificacion;
  me_planificacion_id;
  t_altas;
  t_altas_id;
  clues_regresa;
  clues_contrarefiere;


  r_clinico;
  i_recomendaciones;
  diagnostico_ingreso;

  me_reporta;
  me_reporta_id;

  cie10;
  cie10_codigo;

  //detalle alta
  clues_contrarefiere_alta;
  clues_regresa_alta;
  turno_alta;
  tipo_alta;
  medico_alta;
  img_alta;
  metodos_planificacion_alta;


  observaciones_ts_alta;
  resumen_alta;
  instrucciones_alta;
  diagnostico_alta;
















  //AUN LE APUNTA A SUVCATEGORIAS, AUN FALTA LA DE MEDICOS
  //public medicos_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

  public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  constructor(
            private router: Router,
            private route: ActivatedRoute,
            private crudService: CrudService,
            private fb: FormBuilder,
            private _sanitizer: DomSanitizer,
            private _el: ElementRef) { }
  


  ngOnInit() {

    this.clues_contrarefiere = JSON.parse(localStorage.getItem("clues"));

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
          clues_destino: [''],
          diagnostico: [''],
          esContrareferencia: [0],
          //img:[''],
          multimedias: this.fb.group({
            img:this.fb.array([])
          }),
          medico_refiere_id: [''], //autocomplet
          resumen_clinico: [''],
        }),
      ]),

      altas_incidencias: this.fb.array([
        this.fb.group({
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
    document.getElementById("catalogos").click();

    
}

  cerrarModal() {
    document.getElementById("nuevo_seguimiento").classList.remove('is-active');
  }

  nuevo_seguimiento() {
    document.getElementById("nuevo_seguimiento").classList.add('is-active');
  }

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
  cerrarModalDetalleSeguimiento() {
    document.getElementById("detalle_seguimiento").classList.remove('is-active');
  }
  cerrarModalDetalle(id) {
    document.getElementById(id).classList.remove('is-active');
  }

  abrirModalDetalle(id) {
    document.getElementById(id).classList.add('is-active');
  }

  agregarSeguimiento() {


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

    // if(this.estados_incidencias)      
    //   datomodal["estados_incidencias"] = this.estados_incidencias[ei];



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
    this.subcategorias_cie10 = '';
    this.cerrarModal();

  }

  //carga la lista de catalogos de manera local
  cargarCatalogo(item, url) {
    this.crudService.lista(0, 0, url).subscribe(
      resultado => {
        this[item] = resultado.data;
      },
      error => {
      }
    );
  }

  autocompleMedicos = (data: any) => {

    let html = `<span>${data.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  valorFormato_medico(data: any) {

    let html = `(${data.id}) - ${data.nombre}`;
    return html;
  }

  autocompleFormatoSubcategoriasCIE10 = (data: any) => {

    let html = `<span> ${data.codigo} - ${data.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  valorFormato_SubcategoriasCIE10(data: any) {

    let html = `${data.nombre}`;
    return html;
  }

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
  cerrarModalDetalleReferencia() {
    document.getElementById("detalle_referencia").classList.remove('is-active');
  }

  error_archivo;
  /*seleccionarImagenBase64(evt) {
    var files = evt.target.files;
    var esto = this;
    esto.error_archivo = false;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (function (theFile) {
                return function (e) {
                    try {
                        
                        esto.img = btoa(e.target.result);
                        
                    } catch (ex) {
                        esto.error_archivo = true;
                    }
                }
            })(file);
        }
  }*/
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
              modelo.push(btoa(e.target.result));
            } catch (ex) {
              esto.error_archivo = true;
            }
          }
        })(f);
      }
    }
  }
  
  img=[];

  agregarReferencia() {

    // var cOrigen = 0;
    // if(this.subcategorias_cie10)
    // for(let item of this.subcategorias_cie10){
    //   if(this.subcategorias_cie10_id == item.id)
    //     break;
    //   cOrigen++;
    // };


    var datoReferencia = {

      nuevo: [1, [Validators.required]],
      medico_refiere_id: [this.medico_refiere_id, [Validators.required]],
      diagnostico: [this.diagnostico, [Validators.required]],
      resumen_clinico: [this.resumen_clinico, [Validators.required]],

      clues_origen: [this.clues_origen.clues, [Validators.required]],
      clues_destino: [this.clues_destino.clues, [Validators.required]],

      multimedias: this.fb.group({
        img:this.fb.array(this.img)
      }),

      esContrareferencia: [0],

    };



    const mv: FormArray = <FormArray>this.dato.controls.referencias;
    mv.push(this.fb.group(datoReferencia));


    // console.log("control",this.dato.controls.altas_incidencias['controls']['0']['controls']['multimedias'].value);


    //asigna el estado de incidencia en proceso con numero 2
    this.dato.controls['estados_incidencias_id'].setValue(2);
    this.dato.controls['tieneReferencia'].setValue(1);

    this.medico_refiere_id = '';
    this.diagnostico = '';
    this.resumen_clinico = '';
    this.clues_origen = '';
    this.clues_destino = ''
   
    this.cerrarModalReferencia();

  }


  //mapa_creado = false;

  cargarMapa() {

    //if(this.mapa_creado == false){

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
    //this.mapa_creado = true;
    //}
  }

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

          // despues de asignados se envian los datos al formulario reactivo para que estos se muestren en la vista y se guarden en la base de datos.
          // this.dato.controls['tiempo_traslado'].setValue(this.tiempo);
          // this.dato.controls['distancia_traslado'].setValue(this.distancia);
          // this.dato.controls['observaciones'].setValue(this.observaciones);

          directionsDisplay.setDirections(response);

        } else {
          //si el estatus no es OK mandara un mensaje de alerta mas el status que nos indique la API de GoogleMaps
          window.alert('Directions request failed due to ' + status);
        }
      });
  }

  select_origen_autocomplete(data, latOrigen: any, longOrigen: any) {

    this.latOrigen = data.numeroLatitud;
    this.longOrigen = data.numeroLongitud;
    // this.dato.controls['numeroLatitud_origen'].setValue(this.latOrigen);
    // this.dato.controls['numeroLongitud_origen'].setValue(this.longOrigen);
    this.trazarRuta();
    // this.origin = {latitude: this.latOrigen, longitude: this.longOrigen};
  }

  select_destino_autocomplete(data, latDestino: any, longDestino: any) {

    this.latDestino = data.numeroLatitud;
    this.longDestino = data.numeroLongitud;
    // this.dato.controls['numeroLatitud_destino'].setValue(this.latDestino);
    // this.dato.controls['numeroLongitud_destino'].setValue(this.longDestino);
    this.trazarRuta();
    //this.destination = {latitude: this.latDestino, longitude: this.longDestino};
  }

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

  datosCargados() {

    this.latOrigen = this.dato.controls.numeroLatitud_origen.value;
    this.longOrigen = this.dato.controls.numeroLongitud_origen.value;
    this.latDestino = this.dato.controls.numeroLatitud_destino.value;
    this.longDestino = this.dato.controls.numeroLongitud_destino.value;
    this.trazarRuta();
  }


  cerrarModalReferencia() {
    document.getElementById("referencia").classList.remove('is-active');
  }

  nueva_referencia() {
    document.getElementById("referencia").classList.add('is-active');
  }

  autocompleListFormatter = (data: any) => {

    let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  valorFormato_origen(data: any) {

    let html = `(${data.clues}) - ${data.nombre}`;
    return html;
  }

  valorFormato_destino(data: any) {

    let html = `(${data.clues}) - ${data.nombre}`;
    return html;
  }


  //////////////////////////////Alta////////////////////////////////////

  valorFormato_contrareferencia(data: any) {
    
        let html = `(${data.clues}) - ${data.nombre}`;
        return html;
  }

  autocompleListFormatterRegresa = (data: any) => {
    
    let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
    
  valorFormato_regresa(data: any) {

    let html = `(${data.clues}) - ${data.nombre}`;
    return html;
  }


  detalle_alta(data): void {


    this.folio_referencia = data.incidencias_id;
    this.medico_alta = data.medico_reporta_id;
    this.img_alta = data.multimedias;
    this.clues_contrarefiere_alta = data.clues_contrarefiere;
    this.clues_regresa_alta = data.clues_regresa;
    this.turno_alta = data.turnos.nombre;
    this.tipo_alta = data.tipos_altas.nombre;
    this.resumen_alta = data.resumen_clinico;
    this.diagnostico_alta = data.diagnostico_egreso;
    this.metodos_planificacion_alta = data.metodos_planificacion.nombre;
    this.observaciones_ts_alta = data.observacion_trabajo_social;
    this.instrucciones_alta = data.instrucciones_recomendaciones;





    document.getElementById("detalle_alta").classList.add('is-active');
  }

  cerrarModalDetalleAlta() {
    document.getElementById("detalle_alta").classList.remove('is-active');
  }

  cerrarModalAlta() {
    document.getElementById("alta").classList.remove('is-active');
  }

  nueva_alta() {
    document.getElementById("alta").classList.add('is-active');

    (<HTMLInputElement>document.getElementById('contrareferencia')).value = "("+this.clues_contrarefiere.clues+")"+" - "+this.clues_contrarefiere.nombre;
  }

  cancelarModal(id) {
    document.getElementById(id).classList.remove('is-active');
  }

  abrirModal(id) {
    document.getElementById(id).classList.add('is-active');
  }


  imgalta=[];

  agregarAlta() {

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



    const mv: FormArray = <FormArray>this.dato.controls.altas_incidencias;
    mv.push(this.fb.group(datoAlta));
    
    
    const ref: FormArray = <FormArray>this.dato.controls.referencias;

    if(ref.length > -1){

      this.dato.controls['tieneReferencia'].setValue(1);

    }else{
      this.dato.controls['tieneReferencia'].setValue(0);
    }



    //asigna el estado de incidencia en finalizado con numero 3
    this.dato.controls['estados_incidencias_id'].setValue(3);

    this.clues_regresa = '';
    this.t_altas_id = '';
    this.tur_id = '';
    this.me_reporta_id = '';
    this.r_clinico = '';
    this.diagnostico_egreso = '';
    this.observacion_trabajo_social = '';
    this.me_planificacion_id = '';
    this.i_recomendaciones = '';

    this.cerrarModalAlta();

  }


}