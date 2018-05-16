/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-dash-temporal',
  templateUrl: './dash-temporal.component.html'
})
export class CambiarCluesComponent implements OnInit {


  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(
                private ruta: Router
            ) {}

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    
    /**
    * esta variable regresa a la vista principal del dashboard
    */
    this.ruta.navigate(['/dashboard']);

  }


}
