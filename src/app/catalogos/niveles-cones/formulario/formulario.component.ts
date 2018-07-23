import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from 'environments/environment';
import { CrudService } from '../../../crud/crud.service';

@Component({
  selector: 'niveles-cones-formulario',
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
  * Contiene las unidades medicas por jurisdiccion en el ngModel.
  * @type {any}
  */
  public jurisdicciones: any;

  /**
  * Bandera para mostrar cuando hay elementos cargado del CrudSrvice que conecta a la API.
  * @type {boolean}
  */
  cargando: boolean = false;

  /**
  * Variable que conecta con la URL de la API, para traer Unidades Medicas en un Autocomplet que tiene la Vista.
  * @type {string}
  */
  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],
      clues: this.fb.array([]),
      jurisdicciones: this.fb.array([])
    });


    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }

  /**
  * Método para listar Unidades Medicas en el Autocomplet
  * @param data contiene los elementos que se escriban en el input del Autocomplet
  */
  autocompleListFormatter = (data: any) => {
    let html = `<span>(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
  * Método para obtener el valor de la Unidad Medica
  * @param data contiene el valor de la Unidad Medica
  * @return void
  */
  valorFormato_clue(data: any) {
    let html = `(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}`;
    return html;
  }

  /**
  * Método para obtener la seleccion de la Unidad Medica
  * @param modelo nombre del modelo donde se guarda el dato obtenido
  * @param data objeto donde se busca el elemento para su extraccion
  * @return void
  */
  select_clue_autocomplete(modelo, data) {
    const um =<FormArray> this.dato.controls.clues;
    um.push(this.fb.group(data));
    (<HTMLInputElement>document.getElementById('clues_busqueda')).value = "";
  }

  /**
  * Método para obtener las Unidades Medicas por Jurisdicción
  * @param modelo nombre del modelo donde se guarda el dato obtenido
  * @param index obtiene el indice del elemnto a comparar
  * @param catalogo obtiene la jurisdiccion seleccionada
  * @param modelo_clues donde se almacenaran los valores de las clues encontradas 
  * @return void
  */
  select_clue_autocomplete_jurisdicciones(modelo, index, catalogo, modelo_clues) {

    if (index != "") {
      var i = 0, c = 0;
      catalogo.forEach(element => {
        if (element.id == index)
          c = i;
        i++;
      });
      
      const j = <FormArray> this.dato.controls.jurisdicciones;
      j.push(this.fb.group(catalogo[c]));

      catalogo.splice(c, 1);
      (<HTMLInputElement>document.getElementById('jurisdiccion_busqueda')).value = "";

      var url: string = `jurisdiccion-clues?term=` + index;

      this.cargando = true;

      this.crudService.lista(0, 0, url).subscribe(
        resultado => {
          const um =<FormArray> this.dato.controls.clues;
          
          for (var key of resultado.data) {
               um.push(this.fb.group(key));
          }
          // resultado.forEach(element => {
          //   //modelo_clues.push(this.fb.group(element));
          //   const um =<FormArray> this.dato.controls.clues;
          //   um.push(this.fb.group(element));
          // });
          this.cargando = false;
        },
        error => {
          this.cargando = false;
        }
      );
    }
  }

  /**
  * Método para quitar elementos de la jurisdiccion seleccionada
  * @param modelo obtiene el formgroup
  * @param i obtiene el indice del elemento a eliminar respecto a modelo
  */
  quitar_form_array(modelo, i) {
    modelo.splice(i, 1);
    //modelo.removeAt(i);
  }

  /**
  * Método para quitar elementos que se encuentren en la tabla del HTML
  * @param modelo obtiene el formgroup del elemento que este en la tabla
  * @param i obtiene el indice del elemento a eliminar respecto a modelo en la tabla
  */
  quitar_form_tabla(modelo, i) {
    modelo.removeAt(i);
  }

  /**
  * Método para quitar los elementos por jurisdicción
  * @param modelo obtiene el formgroup del elemento a eliminar
  * @param data obtiene toda la informacion de las unidades medicas seleccionadas
  * @param catalogo array donde cargan los datos de los valores a eliminar
  */
  quitar_clues_jurisdiccion(modelo, data, catalogo) {
    var i = 0;
    catalogo.push(data.value);    
    const modelo_temporal = [];
    this.dato.controls.clues = this.fb.array([]);
    const um =<FormArray> this.dato.controls.clues;    
    modelo.forEach(element => {
      if (element.controls.jurisdicciones.value.nombre == data.value.nombre || element.controls.jurisdicciones.value.id == data.value.id) {        
      }
      else{
        um.controls.push(element);
      }
      i++;
    });
    
    
  }
}