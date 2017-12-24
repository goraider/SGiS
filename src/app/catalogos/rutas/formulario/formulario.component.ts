import { Component, OnInit, ElementRef} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';



declare var google: any;

@Component({
  selector: 'rutas-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent implements OnInit {

  
  dato: FormGroup;
  tamano = document.body.clientHeight;
  latInicial:any = 16.7569;
  longInicial:any = -93.1292;
  zoom: number = 7;

  origin: number;
  destination: number;

  waypoints: any [] = [] ;

  latOrigen: any;
  longOrigen: any;
 
  latDestino: any;
  longDestino: any;
  
  distancia: any = '';
  tiempo: any = '';
  observaciones: any = '';

  numeroLatitud_origen: any;
  numeroLongitud_origen: any;

  numeroLatitud_destino: any;
  numeroLongitud_destino: any;



  latitud: any;
  longitud: any;
  


  
  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

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

    this.dato.controls.clues_origen.valueChanges.subscribe(val => {
      (<HTMLInputElement>document.getElementById('clues_origen')).value = this.dato.controls.clues_origen.value;
    });

    this.dato.controls.clues_destino.valueChanges.subscribe(val => {
      (<HTMLInputElement>document.getElementById('clues_destino')).value = this.dato.controls.clues_destino.value;
    });



    this.dato.controls.numeroLatitud_destino.valueChanges.subscribe((data)=>{
      if(data){
        //var este = this;
        setTimeout(() => {
          this.datosCargados();
        }, 200);
        
      }

    
      // let keys = Object.keys(data);
      // let isFull = true; 
      
      // for(let k of keys){
      //    if(!data[k]){
      //       isFull = false; 
      //     } 
      //   }
      //   console.log("power",data);
      //   console.log("valido", this.dato.valid);
    //   if(isFull){
    //     console.log("isFull");
    //     this.latOrigen = data.numeroLatitud_origen;
    //     this.longOrigen = data.numeroLongitud_origen;
    //     this.latDestino = data.numeroLatitud_destino;
    //     this.longDestino = data.numeroLongitud_destino;
        
    //     this.trazarRuta();
    //     debugger;
    //   }
     });
    
    //this.dato.valueChanges.subscribe((data)=>{ console.log('aqui',data); })




    /*
    this.dato.controls.numeroLatitud_origen = this.latOrigen; CAMBIAR DE VARIABLE LONGITUDES Y LATITUDES AGLOBALES PARA ASIGNARLOS
    this.dato.controls.numeroLongitud_origen = this.longOrigen;
              
    this.dato.controls.numeroLatitud_destino = this.latDestino;
    this.dato.controls.numeroLongitud_destino = this.longDestino;

    */
    
setTimeout(() => {
          let directionsService = new google.maps.DirectionsService;
          let directionsDisplay = new google.maps.DirectionsRenderer;

          let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: parseFloat(this.latInicial), lng: parseFloat(this.longInicial)}
          });
          directionsDisplay.setMap(map);
          //calculateAndDisplayRoute(directionsService, directionsDisplay);

      //   function calcular(directionsService, directionsDisplay) {
      //     console.log("calcular");
      //       directionsService.route({
      //         origin: {lat: this.latOrigen, lng: this.longOrigen},
      //         destination: {lat: this.latDestino , lng: this.longDestino},
      //         //duration: {time: this.tiempo_traslado},
      //         //distance: { km: this.distancia_traslado},
      //         //summary: { ruta: this.observaciones},
      //         //waypoints: waypts,
      //         optimizeWaypoints: true,
      //         travelMode: 'DRIVING'
      //   },
      //   function(response, status) {
      //     if (status === 'OK') {
      //       //this.trazarRuta();
      //       console.log("si");

      //       directionsDisplay.setDirections(response);
      //     } else {
      //       window.alert('Directions request failed due to ' + status);
      //     }
      //   });
      // }
    },0);



    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }


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

  select_origen_autocomplete(data, latOrigen: any, longOrigen: any, clues) {

    this.latOrigen = data.numeroLatitud;
    this.longOrigen = data.numeroLongitud;
    this.dato.controls['numeroLatitud_origen'].setValue(this.latOrigen);
    this.dato.controls['numeroLongitud_origen'].setValue(this.longOrigen);
    this.trazarRuta();
    
   // this.origin = {latitude: this.latOrigen, longitude: this.longOrigen};
  }

  select_destino_autocomplete(data, latDestino: any, longDestino: any, clues) {
    
    this.latDestino = data.numeroLatitud;
    this.longDestino = data.numeroLongitud;
    this.dato.controls['numeroLatitud_destino'].setValue(this.latDestino);
    this.dato.controls['numeroLongitud_destino'].setValue(this.longDestino);
    this.trazarRuta();
    //this.destination = {latitude: this.latDestino, longitude: this.longDestino};
  }

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

datosCargados(){
 
        this.latOrigen = this.dato.controls.numeroLatitud_origen.value;
        this.longOrigen = this.dato.controls.numeroLongitud_origen.value;
        this.latDestino = this.dato.controls.numeroLatitud_destino.value;
        this.longDestino = this.dato.controls.numeroLongitud_destino.value;
        this.trazarRuta();
}

dibujarMarker(clues){

//console.log("tamanio",clues.length);


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













/*

  clues.forEach(element => {

          let directionsService = new google.maps.DirectionsService;
          let directionsDisplay = new google.maps.DirectionsRenderer;
          let posicion = {lat: parseFloat(element.numeroLatitud), lng: parseFloat(element.numeroLongitud)};
          let map = new google.maps.Map(document.getElementById('map'), {
  
          });
         directionsDisplay.setMap(map);

        let infowindow = new google.maps.InfoWindow({
          content: element.nombre +" "+ element.localidad
        });
        let image = "./assets/icono-clues.svg";
        let marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: posicion,
          map: map,
          icon: image,
          //title: this.nombre
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        
          if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        });
    
  });
     */ 
}

//Funciones del Autocomplete

autocompleListFormatter = (data: any) => {

      let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
  }

valorFormato_origen(data: any)  {
  
      let html = `(${data.clues}) - ${data.nombre}`;
      return html;
}

valorFormato_destino(data: any)  {
  
      let html = `(${data.clues}) - ${data.nombre}`;
      return html;
}



}