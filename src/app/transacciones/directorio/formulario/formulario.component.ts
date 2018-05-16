import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';


@Component({
  selector: 'directorio-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
   
  /**
   * Contiene los datos del formulario que comunican a la vista con el componente.
   * @type {FormGroup}
   */
   dato: FormGroup;
   /**
   * Contiene las diferentes pestañas de acceso que puede tener la vista.
   * @type {number}
   */
   tab: number = 1;
   
   /**
   * Bandera para verificar si tiene o no id
   * @type {boolean}
   */
   tieneid: boolean = false;
   
   /**
   * variable que tiene los datos de los medios de contacto
   * @type {object}
   */
   form_sis_usuarios_contactos;
    
   /**
   * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
   * @type {any}
   */
   tamano;
  
   /**
  * Variable que contiene los datos del usuario.
  * @type {any}
  */
   usuario;
   
   /**
   * Contiene datos del usuario si es super usuario o no.
   * @type {any}
   */
   activar_super;
   
   /**
   * Contiene datos de las clues.
   * @type {Array:any}
   */
   clues_sel = [];
   
   /**
   * Contiene la bandera si se han
   * cargado los elementos.
   * @type {boolean}
   */
   cargando: boolean = false;
   
   /**
   * Contiene los valores de la API para generar el Autocomplet.
   * @type {boolean}
   */
   public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private crudService: CrudService,
              private _sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      cargos_id: ['', [Validators.required]],
      foto: [''],
      avatar: ['https://www.menon.no/wp-content/uploads/person-placeholder.jpg'],
      username: [''],
      direccion: [''],
      colonia: [''],
      numero_exterior: [''],
      numero_interior: [''],
      codigo_postal: [''],
      activo: [false],
      municipios_id: ['', [Validators.required]],
      localidades_id: ['', [Validators.required]],
      sis_usuarios_contactos: this.fb.array([]),
      sis_usuarios_clues: this.fb.array([]),
      // sis_usuarios_dashboards: this.fb.array([]),
      // sis_usuarios_reportes: this.fb.array([]),
      sis_usuarios_grupos: this.fb.array([]),
      sis_usuarios_notificaciones: this.fb.array([]),
      permisos: [{}],
      permisos_grupos: [{}]
    });

    this.form_sis_usuarios_contactos = {
      tipos_medios_id: ['1'],
      valor: ['', [Validators.required]]
    };

    this.tamano = document.body.clientHeight;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.activar_super = this.usuario.es_super;

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });

    var sue = 0;
    

    this.dato.controls.sis_usuarios_clues.valueChanges.
      subscribe(val => {
        if (val.length > 0 && sue == 0) {
          sue++;
          setTimeout(() => {
            this.verificar_clues();
          }, 1000);

        }
      });

    this.activar_super = JSON.parse(localStorage.getItem('usuario')).es_super;


    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

  }

  /**
  * Este método verifica las clues que tenga
  * el usuario.
  * @return void
  */
  verificar_clues() {
    this.usuario.forEach(element => {
      if (JSON.stringify(this.dato.get('sis_usuarios_clues').value).indexOf(JSON.stringify({ clues_id: element.id, sis_usuarios_id: this.dato.get('id').value })) > -1)
        this.clues_sel[element.id] = true;
      else
        this.clues_sel[element.id] = false;
    });
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

    const um =<FormArray> this.dato.controls.sis_usuarios_clues;
    if(data == ""){
      (<HTMLInputElement>document.getElementById('clues_busqueda')).value = "";
    }
    else{
      um.push(this.fb.group(data));
      (<HTMLInputElement>document.getElementById('clues_busqueda')).value = "";
    }

  }

  /**
  * Método para quitar elementos de la Unidad Medica.
  * @param modelo obtiene el formgroup
  * @param i obtiene el indice del elemento a eliminar respecto a modelo
  */
  quitar_form_array(modelo, i) {
    modelo.removeAt(i);
  }

}