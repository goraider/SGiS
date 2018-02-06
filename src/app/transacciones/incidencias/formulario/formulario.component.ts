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



@Component({
    selector: 'incidencias-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ["./formulario.component.css"]
})


export class FormularioComponent {

    dato: FormGroup;
    private c = JSON.parse(localStorage.getItem("clues"));
    
    tamano = document.body.clientHeight;

    private CkeditorConfig = {
        height:document.body.clientHeight - 760
      }
      
    tab: number = 1;
    tiene_referencia: number = 0;
    mostrar : boolean = false;
    mostrar_clue : boolean = false;

    form_responsable: any;
    form_persona_responsable: any;
    datos_persona: any;

    nombre_origen: any = '';
    nombre_destino: any = '';

    latInicial: any = 16.7569;
    longInicial: any = -93.1292;

    origin: number;
    destination: number;

    latOrigen: any;
    longOrigen: any;

    latDestino: any;
    longDestino: any;

    distancia: any = '';
    tiempo: any = '';
    observaciones: any = '';

    usuario_clue;

    cargando: boolean = false;

    sub_CIE10_id: number = null;
    temp_cie10_id: number = null;
    
    mostrar_check = false;
    mostrar_folio = true;
    mostrar_check_clue = false;
    //ocultar_pregunta_referencia = false;

    public curp_viejo:any = '';
    public cie10_var_temp: any = '';
    public clues_origen_temp: any = '';
    

    selectedDeal;

    id;

    url_nuevo: string = '';
    url_editar: string = '';
    permisos = JSON.parse(localStorage.getItem("permisos"));
    carpeta;
    modulo;
    controlador;
    modulo_actual;
    icono;
    activarOp = false;

    public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

    public personas_term: string = `${environment.API_URL}/personas-auto?term=:keyword`;

    public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

    public url_img_referencia: string = `${environment.API_PATH}/adjunto/referencias/`;

    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private _el: ElementRef,
        private crudService: CrudService, ) { }

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

        //hacer igual al Json de responsable del formulario reactivo.

        this.form_responsable =
            this.fb.group({
                //indice 0;
                id: [''],
                personas_id: [''],
                parentescos_id: ['', [Validators.required]],
                esResponsable: [1],
            }),


            this.form_persona_responsable =
            this.fb.group({
                id: [''],
                nombre: ['', [Validators.required]],
                paterno: ['', [Validators.required]],
                materno: ['', [Validators.required]],
                telefono: ['', [Validators.required, Validators.pattern("[0-9]*")]],
                domicilio: ['', [Validators.required]],
                fecha_nacimiento: [null],
            }),

            this.generar_folio(this.dato.controls.id, true);

            //const municipioPaciente = <FormGroup>personas.controls.derechohabientes_id;


                                     //this.dato.controls.pacientes['controls']['0']['controls']['personas']['controls']['localidades_id']


        /*
            this.dato.controls.clues.valueChanges.subscribe(val => {
              (<HTMLInputElement>document.getElementById('clues')).value = this.dato.controls.clues.value;
            });
        */
        //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>

  
            document.getElementById("catalogos").click();


        // setTimeout(() => {
        //     document.getElementById("catalogosIngreso").click();
        // }, 200);



        this.route.params.subscribe(params => {
            this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number

            if (this.id) {
                this.cargarDatos();
            }
        });

        


    }

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

    iniciarFormulario() {
        

        this.dato = this.fb.group({

            no_cargar: [true],
            id: [''],
            motivo_ingreso: ['', [Validators.required]],
            impresion_diagnostica: ['', [Validators.required]],
            clues: [this.c.clues],
            estados_incidencias_id: [1],
            tieneReferencia: [''],

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
                    ubicaciones_pacientes_id: ['', [Validators.required]],
                    estados_pacientes_id: ['', Validators.required],
                    triage_colores_id: ['', [Validators.required]],
                    subcategorias_cie10_id: ['',[Validators.required]],
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

        //console.log(this.dato.value);

        
    }

    cargarDatos() {
        if (this.reset_form()) {
            try {
                this.cargando = true;
                


                this.crudService.ver(this.id, "incidencias").subscribe(
                    resultado => {

                        //console.log("datos del editar",resultado);

                                            
                                            
                        this.cargando = false;
                        this.mostrar_check = true;
                        this.mostrar_check_clue = true;
                        this.mostrar_folio = false;
                        //this.ocultar_pregunta_referencia = true;
                        
                        this.iniciarFormulario();
                        

                        
                        //validar todos los key que tengan el array                          
                        if (document.getElementById("catalogos"))

                            document.getElementById("catalogos").click();

                        if(resultado.data.movimientos_incidencias[0]['subcategorias_cie10']['nombre']){
                            this.cie10_var_temp = resultado.data.movimientos_incidencias[0]['subcategorias_cie10']['nombre'];
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

                        
                        
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['id'].patchValue(resultado.data.movimientos_incidencias[0]['id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['subcategorias_cie10_id'].patchValue(resultado.data.movimientos_incidencias[0]['subcategorias_cie10_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['ubicaciones_pacientes_id'].patchValue(resultado.data.movimientos_incidencias[0]['ubicaciones_pacientes_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['estados_pacientes_id'].patchValue(resultado.data.movimientos_incidencias[0]['estados_pacientes_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['triage_colores_id'].patchValue(resultado.data.movimientos_incidencias[0]['triage_colores_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['turnos_id'].patchValue(resultado.data.movimientos_incidencias[0]['turnos_id']);
                        
                       
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

      checked_cambiar_cie10(value){
        if( (<HTMLInputElement>document.getElementById('mostrar_cambiar_CIE10')).checked == true ){
          this.mostrar= true;
        }
        else{ ( (<HTMLInputElement>document.getElementById('mostrar_cambiar_CIE10')).checked == false)
          this.mostrar= false;       
          
        }
          
    }

    checked_cambiar_clue_referencia(value){
        if( (<HTMLInputElement>document.getElementById('mostrar_cambiar_clue_origen')).checked == true ){
          this.mostrar_clue= true;
        }
        else{ ( (<HTMLInputElement>document.getElementById('mostrar_cambiar_clue_origen')).checked == false)
          this.mostrar_clue= false;       
          
        }
          
    }


    agregar_form_array() {

        const pac = <FormArray>this.dato.controls.pacientes;
        const aco = <FormGroup>pac.controls[0];

        const pos = <FormArray>aco.controls.acompaniantes;


        if (!pos.controls[1]) {

            pos.controls.push(this.form_responsable);

            const po1 = <FormGroup>pos.controls[1];

            po1.addControl("personas", this.form_persona_responsable);

            //signacion para mandar al control si es responsable.
            const po0 = <FormGroup>pos.controls[0];
            po0.controls.esResponsable.patchValue(0);


        }

        console.log(this.dato.value);


    }
    private dateChanged(newDate) {
        this.selectedDeal.EndDate = new Date(newDate);
        console.log(this.selectedDeal.EndDate); // <-- for testing
    }


    quitar_form_array(modelo, i: number) {
        modelo.splice(i, 1);
        //modelo.removeAt(i);
    }

    quitar_form_array_responsable(modelo, i: number) {
        modelo.removeAt(i);
    }
    quitar_form_array_tieneReferencia(modelo, i: number) {
        modelo.removeAt(i);
    }

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
            modelo.patchValue(cadena);


    }

    autocompleFormatoCurp = (data: any) => {

        let html = `<span>${data.id}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    valorFormato_curp(data: any) {

        let html = `${data.id}`;
        return html;
    }

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



    autocompleFormatoSubcategoriasCIE10 = (data: any) => {

        let html = `<span> ${data.codigo} - ${data.nombre}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    valorFormato_SubcategoriasCIE10(data: any) {

        let html = `${data.nombre}`;
        return html;
    }


    autocompleListFormatter = (data: any) => {

        let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);


    }



    /////pestaña referencia//////


    valorFormato_origen(data: any) {

        let html = `${data.nombre}`;
        return html;
    }

    autocompleMedicos = (data: any) => {

        let html = `<span>${data.nombre}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    valorFormato_medico(data: any) {

        let html = `(${data.id}) - ${data.nombre}`;
        return html;
    }





    cancelarModal(id) {
        document.getElementById(id).classList.remove('is-active');
    }

    abrirModal(id) {
        document.getElementById(id).classList.add('is-active');
    }





}