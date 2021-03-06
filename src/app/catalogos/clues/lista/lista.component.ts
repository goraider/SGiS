import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';


/**
* Contiene los datos que conectan a la API  de Google Maps
* para cargar el mapa en la vista.
* @type {any}
*/

declare var google: any;

@Component({
  selector: 'clues-lista',
  templateUrl: './lista.component.html'

})

 /**
 * Esta clase inicializa la lista del componente
 * con los datos que se requieran.
 */

export class ListaComponent{
  
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;

  /**
  * Contiene el dato de la Unidad Medica seleccionada.
  * @type {any}
  */
  data_clues: any = {};

  /**
  * Contiene la latitud de la Unidad Medica.
  * @type {any}
  */
  latitud: any;

  /**
  * Contiene la longitud de la Unidad Medica.
  * @type {any}
  */
  longitud: any;

  /**
  * Contiene el domicilio de la Unidad Medica.
  * @type {any}
  */
  domicilio: any;

  /**
  * Contiene el nombre de la Unidad Medica.
  * @type {any}
  */
  nombre: any;

  /**
  * Contiene la localidad de la Unidad Medica.
  * @type {any}
  */
  localidad: any;


   /**
   * Este método obtiene los datos de la unidad medica para  
   * asignarlo al mapa para su geolocalizacion y su información
   * @param data contiene los datos de la unidad medica
   * @return void
   */
    detalle_clue(data): void {

      this.data_clues = data;
      this.latitud = data.numeroLatitud;
      this.longitud = data.numeroLongitud;
      this.nombre = data.nombre;
      this.domicilio = data.domicilio;
      this.localidad = data.localidad;

      document.getElementById("detalle").classList.add('is-active');
      
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        let posicion = {lat: parseFloat(this.latitud), lng: parseFloat(this.longitud)};
        let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: posicion
        });
        directionsDisplay.setMap(map);

      let infowindow = new google.maps.InfoWindow({
        content: this.nombre +" "+ this.localidad
      });
      let image = "./assets/iconos/icono-clues.svg";
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
    }

   /**
   * Este método cierra la ventana modal donde esta la información de la unidad medica
   * @return void
   */
    cerrarModal() {
        document.getElementById("detalle").classList.remove('is-active');
    }

}