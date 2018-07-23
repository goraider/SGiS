/**
* dependencias a utilizar
*/
import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from 'environments/environment';
import { CrudService } from '../../../crud/crud.service';

import * as moment from 'moment';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'estado-fuerza-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {

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
  * almacena la busqueda de la Unidad Medica que se obtenga del Autocomplet en la vista.
  * @type {any}
  */
  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;
  
  /**
  * Contiene la información del usuario que esta en el LocalStorage.
  * @type {any}
  */
  usuario = JSON.parse(localStorage.getItem("usuario"));

  /**
  * Contiene la información del unidad medica que esta en el LocalStorage.
  * @type {any}
  */
  clues_login = JSON.parse(localStorage.getItem("clues"));

  /**
  * Contiene la fecha actual a generar el estado de fuerza.
  * @type {any}
  */
  public fechaEstadoFuerza: any = '';

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(
        private crudService: CrudService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private _el: ElementRef) { }
  
  /**
  * Contiene la instancia al objeto Date, para obtener una fecha en la variable.
  * @type {any}
  */
  fecha = new Date();
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {

    this.fechaEstadoFuerza = moment().subtract(10, 'days').calendar();

    this.dato = this.fb.group({
      clues: [this.clues_login.clues, [Validators.required]],
      sis_usuarios_id: [this.usuario.id, [Validators.required]],
      usuario: [this.usuario.nombre],
      turnos_id: ['', [Validators.required]],
      created_at: [this.fechaEstadoFuerza, [Validators.required]],
      cartera_servicios: this.fb.array([
        this.fb.group({
          items: this.fb.array([

            this.fb.group({
              "id": [''],
              "nombre": [''],
              "cartera_servicios_id": ['', [Validators.required]],
              "tipos_items_id": ['', [Validators.required]],
              "respuesta": ['', [Validators.required]]              
            })

          ])
        })
      ])
    });
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

    setTimeout(()=> {
      if(this.dato.get("sis_usuarios_id").value == ""){
        this.dato.controls.sis_usuarios_id.patchValue(this.usuario.id);
        this.dato.controls.usuario.patchValue(this.usuario.nombre);
        this.dato.controls.clues.patchValue(this.clues_login.clues);
        this.dato.controls.created_at.patchValue(this.fecha);
      }
    }, 3000);

    const servicios: FormArray = <FormArray>this.dato.controls.cartera_servicios;
    const posicion:  FormGroup = <FormGroup>servicios.controls[0];
    const elementos: FormGroup = <FormGroup>posicion.controls.items;
    const posicionItems:  FormGroup = <FormGroup>elementos.controls[0];
    const res = <FormGroup>posicionItems.controls.respuesta;


    
    // items.valueChanges.subscribe(val => {
    //   (<HTMLInputElement>document.getElementById("respuesta")).checked = true;
    // });

  }
  
  /**
  * Este método autocomplet sirve para buscar una Unidad Medica, si es que se desea levantar el estado de fuerza
  * de otra unidad medica.
  * @param data donde se obtienes los datos de la busqueda
  * @return void
  */
  autocompleListFormatter = (data: any) => {
    let html = `<span>(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
  /**
  * Este método autocomplet obtiene el valor que se este buscando de la Unidad Medica
  * @param data donde se obtienes los datos de la busqueda
  * @return void
  */
  valorFormato_clue(data: any) {
    let html = `(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}`;
    return html;
  }
  
  /**
  * Este método autocomplet obtiene los datos del valor de la clue
  * para agregarlos al formulario reactivo.
  * @param modelo donde se guardan los datos si se desea del reactivo.
  * @param data donde se obtienes los datos de la busqueda
  * @return void
  */
  select_clue_autocomplete(modelo, data) {
    const um = <FormArray>this.dato.controls.clues;
    um.push(this.fb.group(data));
    (<HTMLInputElement>document.getElementById('clues_busqueda')).value = "";

    
      if(this.dato.get("sis_usuarios_id").value == ""){
        this.dato.controls.sis_usuarios_id.patchValue(this.usuario.id);
        this.dato.controls.usuario.patchValue(this.usuario.nombre);
        this.dato.controls.created_at.patchValue(this.fecha);
      }

  }
 
}