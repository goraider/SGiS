/**
* dependencias a utilizar
*/
import { Component, OnInit, ElementRef} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';


/**
* Contiene los datos que conectan a la API  de Google Maps
* para cargar el mapa.
* @type {any}
*/
declare var google: any;

@Component({
  selector: 'rutas-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent implements OnInit {

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
  * Contiene la latitud inicial a marcar en el mapa.
  * @type {any}
  */
  latInicial:any = 16.7569;
  
  /**
  * Contiene la longitud inicial a marcar en el mapa.
  * @type {any}
  */
  longInicial:any = -93.1292;

  /**
  * Marca a que nivel deseas ver el mapa, ya se mas cerca o mas lejos.
  * @type {number}
  */
  zoom: number = 7;

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
  * array que contiene todos los puntos a poder marcar en el mapa.
  * @type {any}
  */
  waypoints: any [] = [] ;

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
  * Variable que conecta con la URL de la API, para traer Unidades Medicas en un Autocomplet que tiene la Vista.
  * @type {string}
  */
  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],
      clues_origen: ['', [Validators.required]],
      clues_destino: ['', [Validators.required]],
      tiempo_traslado: ['', [Validators.required]],
      distancia_traslado: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      numeroLatitud_origen: ['', [Validators.required]],
      numeroLongitud_origen: ['', [Validators.required]],
      numeroLatitud_destino: ['', [Validators.required]],
      numeroLongitud_destino: ['', [Validators.required]],
    });

   // debugger ctl k+ctl c y descomentar ctl k ctl u;    

    /**
    * Este método toma los valores de la unidad medica de origen cuando se edita
    * @return {number} la unidad medica de origen
    */
    this.dato.controls.clues_origen.valueChanges.subscribe(val => {
      (<HTMLInputElement>document.getElementById('clues_origen')).value = this.dato.controls.clues_origen.value;
    });

    /**
    * Este método toma los valores de la unidad medica de destino cuando se edita
    * @return {number} la unidad medica de origen
    */
    this.dato.controls.clues_destino.valueChanges.subscribe(val => {
      (<HTMLInputElement>document.getElementById('clues_destino')).value = this.dato.controls.clues_destino.value;
    });


    /**
    * Este método toma el valor de la latitud de destino y carga la funcion
    * para cargar los datos y dibujar la ruta del mapa cuando se edite
    * @return {number} numero de latitud de destino
    */
    this.dato.controls.numeroLatitud_destino.valueChanges.subscribe((data)=>{
      if(data){
        //var este = this;
        setTimeout(() => {
          this.datosCargados();
        }, 200);
        
      }
     });
    
    /**
    * Este método carga el mapa inicial para mostrarlo en la vista
    * @return {number} numero de latitud inicial y numero de longitud inicial
    */
    setTimeout(() => {
          let directionsService = new google.maps.DirectionsService;
          let directionsDisplay = new google.maps.DirectionsRenderer;

          let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: parseFloat(this.latInicial), lng: parseFloat(this.longInicial)}
          });
          directionsDisplay.setMap(map);
    },0);



    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();
  }

    /**
    * Este método toma el calulo de 2 punto para dibujarlos en el mapa
    * @return void
    */
    calcularOrigenDestino(directionsService, directionsDisplay) {

          let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: this.latInicial, lng: this.longInicial}
          });

          directionsService.route({
            origin: {lat: parseFloat(this.latOrigen), lng: parseFloat(this.longOrigen)},
            destination: {lat: parseFloat(this.latDestino), lng: parseFloat(this.longDestino)},         
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
              
              // despues de asignados se envian los datos al formulario reactivo para que estos se muestren en la vista y se guarden en la base de datos.
              this.dato.controls['tiempo_traslado'].setValue(this.tiempo);
              this.dato.controls['distancia_traslado'].setValue(this.distancia);
              this.dato.controls['observaciones'].setValue(this.observaciones);

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
    select_origen_autocomplete(data, latOrigen: any, longOrigen: any, clues) {

      this.latOrigen = data.numeroLatitud;
      this.longOrigen = data.numeroLongitud;
      this.dato.controls['numeroLatitud_origen'].setValue(this.latOrigen);
      this.dato.controls['numeroLongitud_origen'].setValue(this.longOrigen);
      this.trazarRuta();
      
    // this.origin = {latitude: this.latOrigen, longitude: this.longOrigen};
    }

    /**
    * Este método obtiene los datos del autocomplet de la unidad medica de destino
    * y el envio de datos a las variables del formulario reactivo
    * @return void
    */
    select_destino_autocomplete(data, latDestino: any, longDestino: any, clues) {
      
      this.latDestino = data.numeroLatitud;
      this.longDestino = data.numeroLongitud;
      this.dato.controls['numeroLatitud_destino'].setValue(this.latDestino);
      this.dato.controls['numeroLongitud_destino'].setValue(this.longDestino);
      this.trazarRuta();
      //this.destination = {latitude: this.latDestino, longitude: this.longDestino};
    }

    /**
    * Este método realiza el trazo de la ruta teniendo los datos 
    * de la unidad medica, latitud y longitud
    * @return void
    */
    trazarRuta() {

      if( this.latOrigen && this.longOrigen && this.latDestino && this.longDestino ){

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
    datosCargados(){

      this.latOrigen = this.dato.controls.numeroLatitud_origen.value;
      this.longOrigen = this.dato.controls.numeroLongitud_origen.value;
      this.latDestino = this.dato.controls.numeroLatitud_destino.value;
      this.longDestino = this.dato.controls.numeroLongitud_destino.value;
      this.trazarRuta();
    }

    /**
    * Este método sirve para dibujar las diferente rutas de las unidades medicas en el mapa
    * @return void
    */
    dibujarMarker(clues){

      let markers = [];
      let neighborhoods = [];
      let map;
      let image = "./assets/iconos/icono-clues.svg";

      for (let j = 0; j < clues.length; j++){

          neighborhoods.push({lat: parseFloat(clues[j].numeroLatitud), lng: parseFloat(clues[j].numeroLongitud)});
      }
          
          initMap();
          drop();
          
          function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
              zoom: 7,
              center: {lat: 16.7569, lng: -93.1292}
            });
          }

          function drop() {
            clearMarkers();
            for (var i = 0; i < neighborhoods.length; i++) {
              addMarkerWithTimeout(neighborhoods[i], i * 200);
            }
          }

          function addMarkerWithTimeout(position, timeout) {
            window.setTimeout(function() {
              markers.push(new google.maps.Marker({
                position: position,
                map: map,
                icon: image,
              }));
            }, 2000);
          }

          function clearMarkers() {
            for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
            }
            markers = [];
          }

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
    valorFormato_origen(data: any)  {
      let html = `(${data.clues}) - ${data.nombre}`;
      return html;
    }

    /**
    * Método para obtener el valor de la Unidad Medica de destino
    * @param data contiene el valor de la Unidad Medica de destino
    * @return void
    */
    valorFormato_destino(data: any)  {
      let html = `(${data.clues}) - ${data.nombre}`;
      return html;
    }

}