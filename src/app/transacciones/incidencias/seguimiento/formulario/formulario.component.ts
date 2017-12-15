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
  antiguedad:  any = '';
  medico_reporta_id:  any = '';
  incidencias_id:  any = '';
  indicaciones:  any = '';
  reporte_medico:  any = '';
  diagnostico_egreso:  any = '';
  observacion_trabajo_social:  any = '';
  metodos_planificacion_id:  any = '';
  estados_incidencias_id:  any = '';

  ubicaciones_pacientes_id:  any = '';
  estados_pacientes_id:  any = '';
  triage_colores_id:  any = '';
  subcategorias_cie10_id:  any = '';
  turnos_id:  any = '';

  metodos_planificacion:  any = '';
  estados_incidencias:  any = '';
  estados_pacientes:  any = '';
  ubicaciones_pacientes:  any = '';
  triage_colores:  any = '';
  subcategorias_cie10:  any = '';
  turnos:  any = '';
  id:  any = '';

  //detalle seguimiento
  fecha:  any = '';
  medico:  any = '';
  indi:  any = '';
  reporte:  any = '';
  estado_paciente:  any = '';
  no_incidencia:  any = '';
  sub_cie10:  any = '';
  color:  any = '';
  turno:  any = '';
  ubicacion_paciente:  any = '';

  //referencia
  medico_refiere_id:  any = '';
  diagnostico:  any = '';
  resumen_clinico:  any = '';
  clues_origen:  any = '';
  clues_destino:  any = '';
  private clues_origen_login:  any = '';
  img = [];

  //detalle referencia
  folio_referencia:  any = '';
  origen_referencia:  any = '';
  destino_referencia:  any = '';
  diagnostico_referencia:  any = '';
  resumen_clinico_referencia:  any = '';
  img_referencia:  any = '';
  medico_reporta_referencia:  any = '';
  

  //Alta
  tipos_altas:  any = '';
  tur_id:  any = '';
  tur:  any = '';
  me_planificacion:  any = '';
  me_planificacion_id:  any = '';;
  t_altas:  any = '';
  t_altas_id:  any = '';
  clues_regresa:  any = '';
  clues_contrarefiere:  any = '';
  clues_contrareferencia: any = '';
  imgalta = [];


  r_clinico:  any = '';
  i_recomendaciones:  any = '';
  diagnostico_ingreso:  any = '';

  me_reporta:  any = '';
  me_reporta_id:  any = '';

  cie10:  any = '';
  cie10_codigo:  any = '';

  //detalle alta
  clues_contrarefiere_alta:  any = '';
  clues_regresa_alta:  any = '';
  turno_alta:  any = '';
  tipo_alta:  any = '';
  medico_alta:  any = '';
  img_alta:  any = '';
  metodos_planificacion_alta:  any = '';


  observaciones_ts_alta:  any = '';
  resumen_alta:  any = '';
  instrucciones_alta:  any = '';
  diagnostico_alta:  any = '';


  //public medicos_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

  public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  public url_img_referencias: string = `${environment.API_PATH}/adjunto/referencias/`;

  public url_img_altas: string = `${environment.API_PATH}/adjunto/contrareferencias/`;

  constructor(
            private router: Router,
            private route: ActivatedRoute,
            private crudService: CrudService,
            private fb: FormBuilder,
            private _sanitizer: DomSanitizer,
            private _el: ElementRef) { }
  


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
          multimedias: this.fb.group({
            img:this.fb.array([])
          }),
          medico_refiere_id: [''],
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

      setTimeout(() => {
        document.getElementById("catalogoSeguimiento").click();
      }, 200);
    
      setTimeout(() => {
        document.getElementById("catalogosAlta").click();
      }, 200);
    
}

  cerrarModal() {
    this.ubicaciones_pacientes_id = '';
    this.estados_pacientes_id = '';
    this.triage_colores_id = '';
    this.indicaciones = '';
    this.reporte_medico = '';
    this.medico_reporta_id = '';
    this.turnos_id = '';
    this.subcategorias_cie10_id = '';
    document.getElementById("nuevo_seguimiento").classList.remove('is-active');
  }

  nuevo_seguimiento() {
    document.getElementById("nuevo_seguimiento").classList.add('is-active');
  }

  validar_seguimiento() {
    document.getElementById("seguimiento_datos_vacios").classList.add('is-active');
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
          this.subcategorias_cie10_id = '';
          this.cerrarModal();

    }else
    {
      this.validar_seguimiento();
    }

  }
  cerrarModalValidacionSeguimiento() {
    document.getElementById("seguimiento_datos_vacios").classList.remove('is-active');
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

    console.log("detalle referencias",data);

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
              modelo.push({foto: btoa(e.target.result)});
            } catch (ex) {
              esto.error_archivo = true;
            }
          }
        })(f);
      }
    }console.log(modelo);
  }
  
  

  validar_referencia() {
    document.getElementById("referencia_datos_vacios").classList.add('is-active');
  }

  agregarReferencia() {

    if(this.medico_refiere_id != "" && this.diagnostico !="" && this.resumen_clinico !="" && this.clues_destino != ""){

        var datoReferencia = {
    
          nuevo: [1, [Validators.required]],
    
          medico_refiere_id: [this.medico_refiere_id, [Validators.required]],
          diagnostico: [this.diagnostico, [Validators.required]],
          resumen_clinico: [this.resumen_clinico, [Validators.required]],
    
          clues_origen: [this.clues_origen_login.clues, [Validators.required]],
          clues_destino: [this.clues_destino.clues, [Validators.required]],
    
          multimedias: this.fb.group({
            img:this.fb.array(this.img)
          }),
    
          esContrareferencia: [0],
    
        };
    
    
    
        const mv: FormArray = <FormArray>this.dato.controls.referencias;
        mv.push(this.fb.group(datoReferencia));
    
    
    
    
        //asigna el estado de incidencia en proceso con numero 2
        this.dato.controls['estados_incidencias_id'].setValue(2);
        this.dato.controls['tieneReferencia'].setValue(1);
    
        this.medico_refiere_id = '';
        this.diagnostico = '';
        this.resumen_clinico = '';
        this.clues_destino = '';
        this.img = [];
        
        this.cerrarModalReferencia();
      
      }
      else{
        this.validar_referencia();
      }
  }
  cerrarModalValidacionReferencia() {
    document.getElementById("referencia_datos_vacios").classList.remove('is-active');
  }


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

  select_origen_autocomplete(clues_origen_login, latOrigen: any, longOrigen: any) {

    this.latOrigen = clues_origen_login.numeroLatitud;
    this.longOrigen = clues_origen_login.numeroLongitud;

  }

  select_destino_autocomplete(data, latDestino: any, longDestino: any) {

    this.latDestino = data.numeroLatitud;
    this.longDestino = data.numeroLongitud;

    this.select_origen_autocomplete(this.clues_origen_login, this.latOrigen, this.longOrigen);

    this.trazarRuta();
     
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
    this.medico_refiere_id = '';
    this.diagnostico = '';
    this.resumen_clinico = '';
    this.clues_destino = '';
    this.img = [];
    document.getElementById("referencia").classList.remove('is-active');
  }

  nueva_referencia() {
    document.getElementById("referencia").classList.add('is-active');
    (<HTMLInputElement>document.getElementById('clues_origen')).value = "("+this.clues_origen_login.clues+")"+" - "+this.clues_origen_login.nombre;
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

  quitar_form_array(modelo, i: number) {
    modelo.splice(i, 1);
    //modelo.removeAt(i);
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

  validar_alta() {
    document.getElementById("alta_datos_vacios").classList.add('is-active');
  }


  agregarAlta() {

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
        this.imgalta = [];
    
        this.cerrarModalAlta();
    
      }
      else{
        this.validar_alta();
      }

}

cerrarModalValidacionAlta() {
  document.getElementById("alta_datos_vacios").classList.remove('is-active');
}



}