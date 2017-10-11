import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'clues-lista',
  templateUrl: './lista.component.html'

})



export class ListaComponent{
  
  tamano = document.body.clientHeight;
  data_clues: any = {};
  latitud: any;
  longitud: any;
  domicilio: any;
  nombre: any;
  localidad: any;


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
  }

    cerrarModal() {
        document.getElementById("detalle").classList.remove('is-active');
    }

}