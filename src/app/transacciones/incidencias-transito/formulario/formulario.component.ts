/**
* dependencias a utilizar
*/
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';
import { concat } from 'rxjs/observable/concat';
import { FormArrayName, FormGroupName } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { forEach } from '@angular/router/src/utils/collection';
import { elementAt } from 'rxjs/operators/elementAt';


/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
    selector: 'incidencias-transito-formulario',
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
    * Contiene la Unidad Medica que esta en el LocalStorage.
    * @type {any}
    */
    c = JSON.parse(localStorage.getItem("clues"));

    /**
    * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
    * @type {any}
    */
    tamano = document.body.clientHeight;
    
    /**
    * Contiene el tamaño del cuerpo del editor de texto para darle dormato al text area que esta en la vista.
    * @type {any}
    */
    CkeditorConfig = {
        height:document.body.clientHeight - 760
    }
    
    /**
    * Contiene las diferentes pestañas de acceso que puede tener la vista.
    * @type {number}
    */
    tab: number = 1;

    /**
    * Contiene la bandera para mostrar un campo al momento de editar.
    * @type {boolean}
    */    
    mostrar : boolean = false;

    /**
    * Contiene el valor de la unidad medica.
    * @type {boolean}
    */
    mostrar_clue : boolean = false;
    
    /**
    * Bandera para mostrar los datos cuando se edite.
    * @type {boolean}
    */
    cargando: boolean = false;
    
    /**
    * Bandera para mostrar o no un campo cuando se edite.
    * @type {boolean}
    */
    mostrar_check = false;

    /**
    * Bandera para mostrar o no el boton de actualizar folio.
    * @type {boolean}
    */
    mostrar_folio = true;

    /**
    * Bandera para cambiar de Unidad Medica de donde viene el paciente de referencia.
    * @type {boolean}
    */
    mostrar_check_clue = false;
    
    /**
    * Variable que almacena la Curp viaje de la paciente cuando se edita.
    * @type {any}
    */
    curp_viejo:any = '';

    /**
    * Variable que almacena el diagnostico cie10 temporal de la paciente cuando se edita.
    * @type {any}
    */
    cie10_var_temp: any = '';

    /**
    * Variable que almacena la Unidad Médica cuando se edita.
    * @type {any}
    */
    clues_origen_temp: any = '';
    
    /**
    * Variable el id del ingreso cuando se edita.
    * @type {any}
    */
    id;

    /**
    * Contiene la nueva url cuando es un nuevo ingreso.
    * @type {string}
    */
    url_nuevo: string = '';

    /**
    * Contiene la nueva url cuando se edita un ingreso.
    * @type {string}
    */
    url_editar: string = '';

    /**
    * Contiene los permisos del usuario del LocalStorage.
    * @type {string}
    */
    permisos = JSON.parse(localStorage.getItem("permisos"));

    /**
    * se almacena la posicion de la url.
    * @type {any}
    */
    carpeta;

    /**
    * almacena la posicion de la url del modulo.
    * @type {any}
    */
    modulo;
    
    /**
    * almacena el controlador que se este trabajando.
    * @type {any}
    */
    controlador;

    /**
    * almacena el modulo actual.
    * @type {any}
    */ 
    modulo_actual;

    /**
    * obtiene el icono del modulo.
    * @type {any}
    */ 
    icono;

    /**
    * almacena la busqueda de la Unidad Medica que se obtenga del Autocomplet en la vista.
    * @type {any}
    */
    public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;
    
    /**
    * almacena la busqueda de la paicente en el censo de mujeres que se obtenga del Autocomplet en la vista.
    * @type {any}
    */
    public personas_term: string = `${environment.API_URL}/personas-auto?term=:keyword`;
    
    /**
    * almacena la busqueda del diagnostico cie-10 que se obtenga del Autocomplet en la vista.
    * @type {any}
    */
    public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;
    
    /**
    * almacena las imagenes cargadas de acuerdo a una incidencia nueva.
    * @type {any}
    */
    public url_img_referencia: string = `${environment.API_PATH}/adjunto/referencias/`;
  
    /**
    * Este método inicializa la carga de las dependencias 
    * que se necesitan para el funcionamiento del catalogo
    */
    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private _el: ElementRef,
        private crudService: CrudService, ) { }
    
    /**
    * Este método inicializa la carga de la vista asociada junto los datos del formulario
    * @return void
    */
    ngOnInit() {

        this.url_img_referencia;


        this.iniciarFormulario();

        var url = location.href.split("/");
        this.carpeta = url[4];
        this.modulo = url[5];
        //this.modulo_actual = this.modulo.replace(/[-](?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/[-_]+/g, ' ');

        var ctrl = "-" + this.modulo;
        this.controlador = ctrl.toLowerCase()
            // remplazar _ o - por espacios
            .replace(/[-_]+/g, ' ')
            // quitar numeros
            .replace(/[^\w\s]/g, '')
            // cambiar a mayusculas el primer caracter despues de un espacio
            .replace(/ (.)/g, function ($1) {
                return $1.toUpperCase();
            })
            // quitar espacios y agregar controller
            .replace(/ /g, '') + "Controller";

        this.permisos;
        this.url_nuevo = '/' + this.carpeta + '/' + this.modulo + '/nuevo'
        this.url_editar = '/' + this.carpeta + '/' + this.modulo + '/editar/' + this.id;

        var titulo_icono = this.obtener_icono(url, this.controlador, JSON.parse(localStorage.getItem("menu")));

        this.icono = titulo_icono.icono;
        this.modulo_actual = titulo_icono.titulo;

            this.generar_folio(this.dato.controls.id, true);

        //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
        document.getElementById("catalogos").click();


        this.route.params.subscribe(params => {
            this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number

            if (this.id) {
                this.cargarDatos();
            }
        });
    }

    /**
    * Este método obtiene el icono del modulo con el que se este trabajando
    * @param url de la ruta que se este trabajando
    * @param controlador el controlador donde se obtiene el icono
    * @param menu elemento donde se mapea los elementos del array de menu del archivo Environment
    */
    obtener_icono(url, controlador, menu) {
        menu.map((element, key) => {
            if (typeof this.icono == 'undefined') {
                if (element.lista) {
                    this.icono = this.obtener_icono(url, controlador, element.lista);
                    return this.icono;
                }
                if (element.path.indexOf(url[5] + '/' + url[6]) > -1) {
                    this.icono = element;
                    return this.icono;
                } else {
                    if (element.key.indexOf(controlador) > -1) {
                        this.icono = element;
                        return this.icono;
                    }
                }
            }
            else
                return this.icono;
        });
        return this.icono;
    }

    /**
    * Este método carga todos los datos del formulario reactivo que se comunica con la vista
    * @return void
    */
    iniciarFormulario() {
        

        this.dato = this.fb.group({

            no_cargar: [true],
            id: [''],
            motivo_ingreso: ['', [Validators.required]],
            impresion_diagnostica: ['', [Validators.required]],
            clues: [this.c.clues],
            estados_incidencias_id: [1],
            tieneReferencia: [''],
            en_transito:[0],

            pacientes: this.fb.array([
                this.fb.group({
                    //pacientes[0] indice 0;
                    id: [''],
                    personas_id: [''],
                    personas_id_viejo:[''],
                    //personas objeto
                    personas: this.fb.group({
                        id: [''],
                        nombre: ['', [Validators.required]],
                        paterno: ['', [Validators.required]],
                        materno: ['', [Validators.required]],
                        domicilio: ['', [Validators.required]],
                        fecha_nacimiento: ['', [Validators.required]],
                        telefono: ['', [Validators.required, Validators.pattern("[0-9]*")]],
                        estados_embarazos_id: ['', [Validators.required]],
                        derechohabientes_id: ['', [Validators.required]],
                        municipios_id: ['', [Validators.required]],
                        localidades_id: ['', [Validators.required]],
                    }),
                    acompaniantes: this.fb.array([
                        this.fb.group({
                            //indice 0;
                            id: [''],
                            personas_id: [''],
                            parentescos_id: ['', [Validators.required]],
                            esResponsable: [1],
                            //objeto
                            personas: this.fb.group({
                                id: [''],
                                nombre: ['', [Validators.required]],
                                paterno: ['', [Validators.required]],
                                materno: ['', [Validators.required]],
                                telefono: ['', [Validators.required, Validators.pattern("[0-9]*")]],
                                domicilio: ['', [Validators.required]],
                                fecha_nacimiento: [null],
                            }),
                        }),

                    ]),
                }),
            ]),

            movimientos_incidencias: this.fb.array([
                this.fb.group({
                    id: [''],
                    turnos_id: ['', [Validators.required]],
                    top_cie10_id:[''],
                    ubicaciones_pacientes_id: ['', [Validators.required]],
                    estados_pacientes_id: ['', Validators.required],
                    triage_colores_id: ['', [Validators.required]],
                    subcategorias_cie10_id: [''],
                    medico_reporta_id: [null],
                    indicaciones: [null],
                    reporte_medico: [null],
                    diagnostico_egreso: [null],
                    observacion_trabajo_social: [null],
                    metodos_planificacion_id: [null],
                }),
            ]),

            referencias: this.fb.array([
                this.fb.group({
                    id: [''],
                    medico_refiere_id: [''],
                    diagnostico: [''],
                    resumen_clinico: [''],
                    clues_origen: [''],
                    clues_destino: [this.c.clues],
                    //multimedias:[''],
                    multimedias: this.fb.group({
                        img: this.fb.array([])
                    }),
                    esIngreso: [1]
                }),
            ]),

        });



    }
    

    
    /**
    * Este método asigna una curp en la relación del JSON de personas
    * @return void
    */
    //this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas_id'].value);
    asignar_curp() {
        //asigna curp al id que tiene referenciado de la curp del acompañante/paciente.
        if (this.dato.controls.pacientes['controls'][0]) {

            this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['personas_id'].value);

            if (this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]) {
                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas_id'].value);

            }
            if (this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]) {
                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas_id'].value);

            }

        }

    }

    /**
    * Este método resetea el formulario reactivo
    * @return void
    */
    reset_form() {
        this.dato.reset();
        for (let item in this.dato.controls) {
            const ctrl = <FormArray>this.dato.controls[item];
            if (ctrl.controls) {
                if (typeof ctrl.controls.length == 'number') {
                    while (ctrl.length) {
                        ctrl.removeAt(ctrl.length - 1);
                    }
                    ctrl.reset();
                }
            }
        }
        return true;
    }
    
    /**
    * Este método selecciona una imagen, la convierte el base64
    * y la envia al dato del formulario reactivo, cuando es nuevo o se edite.
    * @return void
    */
    error_archivo = false;
    seleccionarImagenBase64(evt, modelo, multiple: boolean = false, index: number = 0) {
        const imagenes = <FormArray>this.dato.controls.referencias['controls'][0]['controls']['multimedias']['controls']['img'];
        
        var files = evt.target.files;
        var esto = this; var fotos = [];
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
            var objeto = [];let este = this;
            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                reader.readAsBinaryString(f);
                
                reader.onload = (function (theFile) {
                    return function (e) {
                        try {
                            modelo.push(este.fb.group(
                                    {
                                        foto: [btoa(e.target.result)],
                                        es_url:false
                                    }
                                )
                            );
                            imagenes.patchValue(modelo);
                        } catch (ex) {
                            esto.error_archivo = true;
                        }
                    }
                })(f);
            }
        }
        
    }

    /**
    * Este método carga los datos del formulario en la vista
    * @return void
    */
    cargarDatos() {
        if (this.reset_form()) {
            try {
                this.cargando = true;
                this.crudService.ver(this.id, "incidencias").subscribe(
                    resultado => {

                        console.log("lo que trae el formulario editar",resultado);

            
                        this.cargando = false;
                        this.mostrar_check = true;
                        this.mostrar_check_clue = true;
                        this.mostrar_folio = false;
                        //this.ocultar_pregunta_referencia = true;
                        
                        this.iniciarFormulario();
                        
                        //validar todos los key que tengan el array                          
                        if (document.getElementById("catalogos"))
                            document.getElementById("catalogos").click();

                        if(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['subcategorias_cie10']['nombre']){
                            this.cie10_var_temp = resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['subcategorias_cie10']['nombre'];
                        }

                        if(resultado.data.referencias.length > 0){

                            this.clues_origen_temp = resultado.data.referencias[resultado.data.referencias.length -1]['clues_origen_o']['nombre'];

                        }

                        this.curp_viejo = resultado.data.pacientes[0]['personas_id'];

                        this.dato.controls.id.patchValue(resultado.data.id);
                        this.dato.controls.clues.patchValue(resultado.data.clues);
                        this.dato.controls.motivo_ingreso.patchValue(resultado.data.motivo_ingreso);
                        this.dato.controls.impresion_diagnostica.patchValue(resultado.data.impresion_diagnostica);
                        this.dato.controls.tieneReferencia.patchValue(resultado.data.tieneReferencia);                        
                        this.dato.controls.pacientes['controls'][0]['controls']['id'].patchValue(resultado.data.pacientes[0]['id']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas_id'].patchValue(resultado.data.pacientes[0]['personas_id']);

                        this.dato.controls.pacientes['controls'][0]['controls']['personas_id_viejo'].patchValue(this.curp_viejo);

                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['id'].patchValue(resultado.data.pacientes[0]['personas']['id']);
                        //this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['editar_curp'].patchValue(this.editar_curp);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['nombre'].patchValue(resultado.data.pacientes[0]['personas']['nombre']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['paterno'].patchValue(resultado.data.pacientes[0]['personas']['paterno']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['materno'].patchValue(resultado.data.pacientes[0]['personas']['materno']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['domicilio'].patchValue(resultado.data.pacientes[0]['personas']['domicilio']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['fecha_nacimiento'].patchValue(resultado.data.pacientes[0]['personas']['fecha_nacimiento']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['telefono'].patchValue(resultado.data.pacientes[0]['personas']['telefono']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['estados_embarazos_id'].patchValue(resultado.data.pacientes[0]['personas']['estados_embarazos_id']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['derechohabientes_id'].patchValue(resultado.data.pacientes[0]['personas']['derechohabientes_id']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['municipios_id'].patchValue(resultado.data.pacientes[0]['personas']['municipios_id']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['localidades_id'].patchValue(resultado.data.pacientes[0]['personas']['localidades_id']);

                        var cont = 0;
                        if(!this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']){
                           this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes'] = this.fb.array([]);
                        }

                        resultado.data.pacientes[0]['acompaniantes'].forEach(element => {
                            
                            if (!this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]) {
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont] = this.fb.group({
                                    id: [''],
                                    personas_id: [''],
                                    parentescos_id: ['', [Validators.required]],
                                    esResponsable: [1],
                                    personas: this.fb.group({
                                        id: [''],
                                        nombre: ['', [Validators.required]],
                                        paterno: ['', [Validators.required]],
                                        materno: ['', [Validators.required]],
                                        telefono: ['', [Validators.required]],
                                        domicilio: ['', [Validators.required]],
                                        fecha_nacimiento: [null],
                                    }),
                                });
                            }

                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['id'].patchValue(element['id']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['personas_id'].patchValue(element['personas_id']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['esResponsable'].patchValue(element['esResponsable']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['parentescos_id'].patchValue(element['parentescos_id']);

                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['personas']['controls']['id'].patchValue(element['personas']['id']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['personas']['controls']['nombre'].patchValue(element['personas']['nombre']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['personas']['controls']['paterno'].patchValue(element['personas']['paterno']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['personas']['controls']['materno'].patchValue(element['personas']['materno']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['personas']['controls']['telefono'].patchValue(element['personas']['telefono']);
                            this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]['controls']['personas']['controls']['domicilio'].patchValue(element['personas']['domicilio']);

                            cont++;
                        });

                        
                        
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['id'].patchValue(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['subcategorias_cie10_id'].patchValue(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['subcategorias_cie10_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['ubicaciones_pacientes_id'].patchValue(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['ubicaciones_pacientes_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['estados_pacientes_id'].patchValue(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['estados_pacientes_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['triage_colores_id'].patchValue(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['triage_colores_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['turnos_id'].patchValue(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1]['turnos_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['top_cie10_id'].patchValue(resultado.data.movimientos_incidencias[resultado.data.movimientos_incidencias.length -1].top_cie10_id);
                       

                        this.dato.controls.referencias['controls'][0]['controls']['id'].patchValue(resultado.data.referencias[resultado.data.referencias.length -1]['id']);
                        this.dato.controls.referencias['controls'][0]['controls']['medico_refiere_id'].patchValue(resultado.data.referencias[resultado.data.referencias.length -1]['medico_refiere_id']);
                        this.dato.controls.referencias['controls'][0]['controls']['diagnostico'].patchValue(resultado.data.referencias[resultado.data.referencias.length -1]['diagnostico']);
                        this.dato.controls.referencias['controls'][0]['controls']['resumen_clinico'].patchValue(resultado.data.referencias[resultado.data.referencias.length -1]['resumen_clinico']);
                        this.dato.controls.referencias['controls'][0]['controls']['clues_origen'].patchValue(resultado.data.referencias[resultado.data.referencias.length -1]['clues_origen']);
                        this.dato.controls.referencias['controls'][0]['controls']['clues_destino'].patchValue(resultado.data.referencias[resultado.data.referencias.length -1]['clues_destino']);
                        

                        resultado.data.referencias[resultado.data.referencias.length -1].multimedias.forEach(element => {
                            //this.dato.controls.referencias['controls'][0]['controls']['multimedias']['controls']['img'] = this.fb.array([]);
                            this.dato.controls.referencias['controls'][0]['controls']['multimedias']['controls']['img'].push(this.fb.group({foto: element.url, es_url:true}));

                        });

                        this.dato.controls.referencias['controls'][0]['controls']['esIngreso'].patchValue(resultado.data.referencias[resultado.data.referencias.length -1]['esIngreso']);
                    },
                    error => {
                    }
                );
            } catch (e) {
                console.log(0, e);
            }
        }
    }

    /**
    * Este método muestra un campo para cambiar el diagnostico cie10 cuando se edite el ingreso
    * @param value obtiene el id del elemento del HTML
    */
    checked_cambiar_cie10(value){
        if( (<HTMLInputElement>document.getElementById('mostrar_cambiar_CIE10')).checked == true ){
          this.mostrar= true;
        }
        else{ ((<HTMLInputElement>document.getElementById('mostrar_cambiar_CIE10')).checked == false)
          this.mostrar= false;
        }
          
    }

    /**
    * Este método muestra si el campo para buscar otra Unidad Medica cuando se edite un ingreso
    * @param value obtiene el id del elemento del HTML
    */
    checked_cambiar_clue_referencia(value){
        
        if( (<HTMLInputElement>document.getElementById('mostrar_cambiar_clue_origen')).checked == true ){
          this.mostrar_clue= true;
        }
        else{ ( (<HTMLInputElement>document.getElementById('mostrar_cambiar_clue_origen')).checked == false)
          this.mostrar_clue= false;       
          
        } 
    }

    /**
    * Este método quita o elimina un elemento de un array
    * @param modelo Nombre del modelo donde se guarda el dato obtenido
    * @param i Posicion del elemento a eliminar
    * @return void
    */
    quitar_form_array(modelo, i: number) {
        modelo.splice(i, 1);
        //modelo.removeAt(i);
    }

    /**
    * Este método quita o elimina un elemento de un array del responsable
    * @param modelo Nombre del modelo donde se guarda el dato obtenido
    * @param i Posicion del elemento a eliminar
    * @return void
    */
    quitar_form_array_responsable(modelo, i: number) {
        modelo.removeAt(i);
    }
    
    /**
    * Este método quita o elimina un elemento de un array de la pestaña de referencia
    * @param modelo Nombre del modelo donde se guarda el dato obtenido
    * @param i Posicion del elemento a eliminar
    * @return void
    */
    quitar_form_array_tieneReferencia(modelo, i: number) {
        modelo.removeAt(i);
    }
    
    /**
    * Este método para generar un folio del ingreso
    * @param modelo Nombre del modelo donde se guarda el dato obtenido
    * @param esmodelo bandera para verificar si es modelo o no
    * @return void
    */
    generar_folio(modelo, esmodelo: boolean = false) {

        let fecha: any = new Date();
        let mes: any = fecha.getMonth() + 1;
        let dia: any = fecha.getDate();
        let año: any = fecha.getFullYear();
        let hora: any = fecha.getHours();
        let minuto: any = fecha.getMinutes();
        let segundo: any = fecha.getSeconds();
        let milisegundos: any = fecha.getMilliseconds();

        let folio = dia + '' + mes + '' + año + '' + hora + '' + minuto + '' + segundo + '' + milisegundos;
        let cadena = "";

        cadena = folio;
        if (!esmodelo)
            modelo = cadena;
        else
            modelo.patchValue(this.c.clues+'-'+cadena);
    }

    /**
    * Este método autocomplet donde se obtienen los datos de un paciente de acuerdo a la curp
    * @param data donde se obtienes los datos de la busqueda
    * @return void
    */
    autocompleFormatoCurp = (data: any) => {

        let html = `<span>${data.id}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    /**
    * Método para obtener el valor de la curp
    * @param data contiene el valor de la curp
    * @return void
    */
    valorFormato_curp(data: any) {

        let html = `${data.id}`;
        return html;
    }

    /**
    * Método para obtener el valor de la curp
    * @param data contiene el valor de la Unidad Medica
    * @param value contiene el valor que se este buscando
    * @return void
    */
    select_datosPaciente_autocomplete(data: any, value) {

        if (data.id) {

            //asgina el valor viejo de la curp para que no se duplique
            this.dato.controls.pacientes['controls'][0]['controls']['personas_id_viejo'].patchValue(data.id);

            if (document.getElementById("catalogos"))
                document.getElementById("catalogos").click();

            
            //Se asigna en variables el formulario formulario reactivo, respecto si es un FormArray o un FormGroup
            const pacientes = <FormArray>this.dato.controls.pacientes;
            const posicion = <FormGroup>pacientes.controls[0];
            const personas = <FormGroup>posicion.controls.personas;

            //se le colocan los datos a los controles del html que estan asociados con el formulario reactivo, respecto a lo que traiga el parametro data.

            const idCurp = <FormGroup>posicion.controls.personas_id;
            idCurp.patchValue(data.id);

            const idCurpPersona = <FormGroup>personas.controls.id;
            idCurpPersona.patchValue(data.id);

            const nombre = <FormGroup>personas.controls.nombre;
            nombre.patchValue(data.nombre);

            const paterno = <FormGroup>personas.controls.paterno;
            paterno.patchValue(data.paterno);

            const materno = <FormGroup>personas.controls.materno;
            materno.patchValue(data.materno);

            const fecha_nacimiento = <FormGroup>personas.controls.fecha_nacimiento;
            fecha_nacimiento.patchValue(data.fecha_nacimiento);

            const telefono = <FormGroup>personas.controls.telefono;
            telefono.patchValue(data.telefono);

            const domicilio = <FormGroup>personas.controls.domicilio;
            domicilio.patchValue(data.domicilio);

            const estados_embarazos = <FormGroup>personas.controls.estados_embarazos_id;
            estados_embarazos.patchValue(data.estados_embarazos_id);

            const derechohabientes = <FormGroup>personas.controls.derechohabientes_id;
            derechohabientes.patchValue(data.derechohabientes_id);

            const localidades = <FormGroup>personas.controls.localidades_id;
            localidades.patchValue(data.localidades_id);

            const municipios = <FormGroup>personas.controls.municipios_id;
            municipios.patchValue(data.municipios_id);
        }

    }

    /**
    * Este método autocomplet donde se obtienen los datos del diagnostico CIE-10 que se este buscando
    * @param data donde se obtienes los datos de la busqueda
    * @return void
    */
    autocompleFormatoSubcategoriasCIE10 = (data: any) => {

        let html = `<span> ${data.codigo} - ${data.nombre}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    /**
    * Método para obtener el valor del diagnostico CIE-10
    * @param data contiene el valor deL diagnostico CIE-10
    * @return void
    */
    valorFormato_SubcategoriasCIE10(data: any) {

        let html = `${data.nombre}`;
        return html;
    }

    /**
    * Este método autocomplet sirve para buscar una Unidad Medica de donde venga el paciente
    * en la pestaña de referencia.
    * @param data donde se obtienes los datos de la busqueda
    * @return void
    */
    autocompleListFormatter = (data: any) => {

        let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    /////pestaña referencia//////
    /**
    * Este método autocomplet obtiene el valor que se este buscando de la Unidad Medica
    * @param data donde se obtienes los datos de la busqueda
    * @return void
    */
    valorFormato_origen(data: any) {

        let html = `${data.nombre}`;
        return html;
    }

    /**
    * Este método autocomplet sirve para buscar un medico de la Unidad Medica logeada
    * @param data donde se obtienes los datos de la busqueda
    * @return void
    */
    autocompleMedicos = (data: any) => {

        let html = `<span>${data.nombre}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    /**
    * Este método autocomplet obtiene el valor que se este buscando del medico
    * @param data donde se obtienes los datos de la busqueda
    * @return void
    */
    valorFormato_medico(data: any) {

        let html = `(${data.id}) - ${data.nombre}`;
        return html;
    }

    /**
    * Este método cierra la ventana modal
    * @param id obtiene el id del elemento a cerrar
    * @return void
    */
    cancelarModal(id) {
        document.getElementById(id).classList.remove('is-active');
    }

    /**
    * Este método abre la ventana modal
    * @param id obtiene el id del elemento para abrir
    * @return void
    */
    abrirModal(id) {
        document.getElementById(id).classList.add('is-active');
    }

}