/**
* dependencias a utilizar
*/
import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'usuarios-formulario',
  templateUrl: './formulario.component.html'
})

 /**
 * Esta clase inicializa lo valores 
 * del formulario.
 */
export class FormularioComponent {
   
  /**
   * Contiene los datos del formulario que comunican a la vista con el componente.
   * @type {FormGroup}
   */
   dato: FormGroup;

   /**
   * Bandera donde se cambia el
   * password.
   * @type {boolean}
   */
   cambiarPassword: boolean = false;

   /**
   * Bandera donde se muestra el cambio de
   * password.
   * @type {boolean}
   */
   mostrarCambiarPassword: boolean = false;

   /**
   * Contiene las diferentes pestañas de acceso que puede tener la vista.
   * @type {number}
   */
   tab: number = 1;

   /**
   * Bandera si contiene o no
   * su id.
   * @type {boolean}
   */
   tieneid: boolean = false;
   
   /**
   * Contiene el formulario
   * de contactos del usuario.
   * @type {any}
   */
   form_sis_usuarios_contactos;

   /**
   * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
   * @type {any}
   */
   tamano;
  
   /**
   * Contiene los datos del usuario.
   * @type {any}
   */
   usuario;

   /**
   * Contiene los valores
   * si es superusuario.
   * @type {any}
   */
   activar_super;
   
   /**
   * Contiene el array de clues
   * @type {Array}
   */
   clues_sel = [];

   // Variables, por si se desea agregar permisos individuales
   sucursal_sel = [];
   permisos_all: any[] = [];

   /**
   * Contiene la bandera
   * si ha cargado o no la lista
   * @type {boolean}
   */
   cargando: boolean = false;
  
   /**
   * Variable que conecta con la URL de la API, para traer Unidades Medicas en un Autocomplet que tiene la Vista.
   * @type {string}
   */
   public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

   /**
   * Variable que conecta con la URL de la API, para traer una persona del Directorio en un Autocomplet que tiene la Vista.
   * @type {string}
   */
  public usuarios_auto: string = `${environment.API_URL}/usuarios-auto?term=:keyword`;

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
      cambiarPassword: [false, []],
      password: [{ value: '', disabled: true }, [Validators.required]],
      confirmarPassword: [{ value: '', disabled: true }, [Validators.required]],
      foto: [''],
      avatar: ['https://www.menon.no/wp-content/uploads/person-placeholder.jpg'],
      username: [''],
      direccion: [''],
      colonia: [''],
      numero_exterior: [''],
      numero_interior: [''],
      spam: [''],
      es_super: [0],
      codigo_postal: [''],
      last_login: [''],
      activo: [''],
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
        this.mostrarCambiarPassword = true;
        setTimeout(() => {
          this.dato.controls["password"].setValue('');
        }, 2000);
      }
      else
        this.toggleCambiarPassword();
    });

    var sue = 0;
    

    this.dato.controls.sis_usuarios_clues.valueChanges.
      subscribe(val => {
        if (val.length > 0 && sue == 0) {
          sue++;
          setTimeout(() => {
            this.verificar_clues();
          }, 2000);

        }
      });

    // permisos individuales
    this.dato.controls.permisos_grupos.valueChanges.
    subscribe(val => {
      if (val) {
        if (this.dato.controls.permisos.value) {
          this.dato.controls.permisos.patchValue(JSON.parse(this.dato.controls.permisos.value));
        }
      }
    });
    this.activar_super = JSON.parse(localStorage.getItem('usuario')).es_super;


    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

  }

  /**
  * Este método modifica los permisos
  * individuales, si es que se desean agregar, estan deshabilitados.
  * @return void
  */
  modificar_permisos_individuales() {
    if (this.dato.get('permisos').value != '') {
      this.dato.controls.permisos.patchValue('');
    } else {

      this.dato.controls.permisos.patchValue(JSON.parse(this.dato.controls.permisos_grupos.value));

    }
  }

  /**
  * Este método cambia el password.
  * @return void
  */
  toggleCambiarPassword() {
    this.cambiarPassword = !this.cambiarPassword
    this.dato.controls["password"].setValue('');
    if (this.cambiarPassword) {
      this.dato.get('password').enable();
      this.dato.get('confirmarPassword').enable();
    } else {
      this.dato.get('password').disable();
      this.dato.get('confirmarPassword').disable();
    }
  }

  /**
  * Este método verifica las clues del usuario.
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
  * Método para obtener las Unidades Medicas
  * @param modelo nombre del modelo donde se guarda el dato obtenido
  * @param data obtiene el indice del elemento a comparar
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
  * Este método autocomplet donde se obtienen los datos del Usuario de acuerdo a su nombre o corre que este
  * registrado en el directorio
  * @param data donde se obtienes los datos de la busqueda
  * @return void
  */
  autocompleFormatoUsuario = (data: any) => {

    let html = `<span>${data.email} - ${data.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
  * Método para obtener el valor de la curp
  * @param data contiene el valor de la curp
  * @return void
  */
  valorFormato_Usuario(data: any) {

      let html = `${data.email}`;
      return html;
  }

    /**
    * Método para obtener el valor los datos del Usuario
    * @param data contiene el valor de la Unidad Medica
    * @param value contiene el valor que se este buscando
    * @return void
    */
   select_datosUsuario_autocomplete(data: any, value) {

    if (data.id) {
        
        this.dato.controls.sis_usuarios_clues = new FormArray([]);
        this.dato.controls.sis_usuarios_notificaciones = new FormArray([]);
        this.dato.controls. sis_usuarios_contactos = new FormArray([]);

        //asgina el valor viejo de la curp para que no se duplique
        //this.dato.controls.pacientes['controls'][0]['controls']['personas_id_viejo'].patchValue(data.id);

        if (document.getElementById("catalogos"))
            document.getElementById("catalogos").click();

        
        //Se asigna en variables el formulario formulario reactivo, respecto si es un FormArray o un FormGroup

        const email = <FormGroup>this.dato.controls.email;
        email.patchValue(data.email);
        
        const pacientes = <FormGroup>this.dato.controls.nombre;
        pacientes.patchValue(data.nombre);

        const municipio = <FormGroup>this.dato.controls.municipios_id;
        municipio.patchValue(data.municipios_id);

        const localidad = <FormGroup>this.dato.controls.localidades_id;
        localidad.patchValue(data.localidades_id);  

        const direccion = <FormGroup>this.dato.controls.direccion;
        direccion.patchValue(data.direccion);



        data.sis_usuarios_clues.forEach(element => {

          const clues = <FormArray>this.dato.controls.sis_usuarios_clues;

          (<FormArray>clues).push(this.fb.group(element));

        });

        data.sis_usuarios_notificaciones.forEach(element => {

          const notificaciones = <FormArray>this.dato.controls.sis_usuarios_notificaciones;

          (<FormArray>notificaciones).push(this.fb.group(element));

        });


        data.sis_usuarios_contactos.forEach(element => {

          const medios = <FormArray>this.dato.controls.sis_usuarios_contactos;

          this.agregar_form_array(medios, this.form_sis_usuarios_contactos = {
            tipos_medios_id: [element.tipos_medios.id],
            valor: [element.valor, [Validators.required]]
          })

        });


        //se le colocan los datos a los controles del html que estan asociados con el formulario reactivo, respecto a lo que traiga el parametro data.

    }
  }

  /**
  * Método para quitar elementos de las clues.
  * @param modelo obtiene el formgroup
  * @param i obtiene el indice del elemento a eliminar respecto a modelo
  */
  quitar_form_array(modelo, i) {
    modelo.removeAt(i);
  }

  agregar_form_array(modelo: FormArray, formulario) {
    (<FormArray>modelo).push(this.fb.group(formulario));
  }

    // permisos individuales

  todosAccion(padre, accion, modelo) {
    if (typeof this.dato.controls.permisos.value == 'string') {
      this.dato.controls.permisos.patchValue(JSON.parse(this.dato.controls.permisos.value));
    }
    if (!this.permisos_all[padre])
      this.permisos_all[padre] = false;

    this.permisos_all[padre] = !this.permisos_all[padre];
    var valor = this.permisos_all[padre];

    accion.forEach(function (value, key) {
      if (!valor) {
        delete modelo.value[padre + "." + value.recurso];
      }
      else {
        modelo.value[padre + "." + value.recurso] = valor ? 1 : 0;
      }
    });
  }

  agregar_accion(clave) {
    if (this.dato.controls.permisos.value[clave])
      delete this.dato.controls.permisos.value[clave];
    else
      this.dato.controls.permisos.value[clave] = 1;
  }
  
}