import { Component, OnInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';



@Component({
    selector: 'incidencias-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ["./formulario.component.css"]
})


export class FormularioComponent {

    dato: FormGroup;
    tamano = document.body.clientHeight;
    tab: number = 1;
    mostrar;

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

    private cargando: boolean = false;

    private municipios_id: number = null;
    private temp_municipios_id: number = null;

    private localidades_id: number = null;
    private temp_localidades_id: number = null;
    private selectedDeal;

    private id;
    
    private url_nuevo: string = '';
    private url_editar: string = '';
    private url_imprimir: string = '';
    private permisos;
    private carpeta;
    private modulo;
    private controlador;
    private modulo_actual;

    public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

    public personas_term: string = `${environment.API_URL}/personas-auto?term=:keyword`;

    public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private _sanitizer: DomSanitizer,
                private _el: ElementRef,
                private crudService: CrudService,) { }

    ngOnInit() {

        this.iniciarFormulario();

        var url = location.href.split("/");
        this.carpeta = url[3];
        this.modulo = url[4];
        this.modulo_actual = this.modulo.replace(/[-](?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/[-_]+/g, ' ');
    
        var ctrl = "-" + this.modulo;
        this.controlador = ctrl.toLowerCase()
            // remplazar _ o - por espacios
            .replace(/[-_]+/g, ' ')
            // quitar numeros
            .replace(/[^\w\s]/g, '')
            // cambiar a mayusculas el primer caracter despues de un espacio
            .replace(/ (.)/g, function($1) {
                return $1.toUpperCase(); })
            // quitar espacios y agregar controller
            .replace(/ /g, '') + "Controller";
    
        this.permisos = JSON.parse(localStorage.getItem("permisos"));
        this.url_nuevo = '/' + this.carpeta + '/' + this.modulo + '/nuevo'
        this.url_editar = '/' + this.carpeta + '/' + this.modulo + '/editar/' + this.id;
        this.url_imprimir = '/' + this.carpeta + '/' + this.modulo + '/ver/' + this.id;

        //hacer igual al Json de responsable del formulario reactivo arriba.

        this.form_responsable =
            this.fb.group({
                //indice 0;
                id:[''],
                personas_id: [''],
                parentescos_id: ['', [Validators.required]],
                esResponsable: [1],
            }),


            this.form_persona_responsable =
            this.fb.group({
                id:[''],
                nombre: ['', [Validators.required]],
                paterno: ['', [Validators.required]],
                materno: ['', [Validators.required]],
                telefono: ['', [Validators.required]],
                domicilio: ['', [Validators.required]],
                fecha_nacimiento: [null],
            }),

            this.generar_folio(this.dato.controls.id, true);

        /*
            this.dato.controls.clues.valueChanges.subscribe(val => {
              (<HTMLInputElement>document.getElementById('clues')).value = this.dato.controls.clues.value;
            });
        */
        //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
        document.getElementById("catalogos").click();

        var im = 0, il = 0;

//        const pacientes = <FormArray>this.dato.controls.pacientes['controls']['personas']['controls']['municipios_id'];

        this.dato.controls['pacientes']['controls']['0']['controls']['personas']['controls']['municipios_id'].valueChanges.
        subscribe(val => {
          if (val && im == 0) {
            im++;
            this.temp_municipios_id = val;
          }
        });

        this.dato.controls.pacientes['controls']['0']['controls']['personas']['controls']['localidades_id'].valueChanges.
        subscribe(val => {
          if (val && il == 0) {
            il++;
            this.temp_localidades_id = val;
          }
        });

        this.route.params.subscribe(params => {
            this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number

            if (this.id) {                
                this.cargarDatos();
            }
        });
        
    }

    iniciarFormulario(){

        
        this.dato = this.fb.group({
                    
                        no_cargar: [true],
                        id: [''],
                        motivo_ingreso: ['', [Validators.required]],
                        impresion_diagnostica: ['', [Validators.required]],
                        clues: ['', [Validators.required]],
                        estados_incidencias_id: [1],
            
                        pacientes: this.fb.array([
                            this.fb.group({
                                //pacientes[0] indice 0;
                                id:[''],
                                personas_id: [''],
                                //personas objeto
                                personas: this.fb.group({
                                    id:[''],
                                    nombre: ['', [Validators.required]],
                                    paterno: ['', [Validators.required]],
                                    materno: ['', [Validators.required]],
                                    domicilio: ['', [Validators.required]],
                                    fecha_nacimiento: ['', [Validators.required]],
                                    telefono: ['', [Validators.required]],
            
                                    estados_embarazos_id: ['', [Validators.required]],
                                    derechohabientes_id: ['', [Validators.required]],
                                    municipios_id: [''],
                                    localidades_id: [''],
                                }),
                                acompaniantes: this.fb.array([
                                    this.fb.group({
                                        //indice 0;
                                        id:[''],
                                        personas_id: [''],
                                        parentescos_id: ['', [Validators.required]],
                                        esResponsable: [1],
                                        //objeto
                                        personas: this.fb.group({
                                            id:[''],
                                            nombre: ['', [Validators.required]],
                                            paterno: ['', [Validators.required]],
                                            materno: ['', [Validators.required]],
                                            telefono: ['', [Validators.required]],
                                            domicilio: ['', [Validators.required]],
                                            fecha_nacimiento: [null],
                                        }),
                                    }),
            
                                ]),
                            }),
                        ]),
            
                        movimientos_incidencias: this.fb.array([
                            this.fb.group({
                                id:[''],
                                turnos_id: ['', [Validators.required]],
                                ubicaciones_pacientes_id: ['', [Validators.required]],
                                estados_pacientes_id: [1],
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
                                 medico_refiere_id:[''],
                                 diagnostico:[''],
                                 resumen_clinico:[''],
                                 clues_origen:[''],
                                 clues_destino:[''],                       
                                 img:[''],
                                 esContrareferencia:[0],
                           }),
                         ]),
            
                    });

                    var im = 0, il = 0;
                    
                    //        const pacientes = <FormArray>this.dato.controls.pacientes['controls']['personas']['controls']['municipios_id'];
                    
                    this.dato.controls['pacientes']['controls']['0']['controls']['personas']['controls']['municipios_id'].valueChanges.
                    subscribe(val => {
                        if (val && im == 0) {
                        im++;
                        this.temp_municipios_id = val;
                        }
                    });
            
                    this.dato.controls.pacientes['controls']['0']['controls']['personas']['controls']['localidades_id'].valueChanges.
                    subscribe(val => {
                        if (val && il == 0) {
                        il++;
                        this.temp_localidades_id = val;
                        }
                    });
                    

    }

    //this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas_id'].value);
    asignar_curp(){

        if(this.dato.controls.pacientes['controls'][0]){
            this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['personas_id'].value);
            
            console.log("paciente[0]", this.dato.controls.pacientes['controls'][0].value);
                        
            if(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]){
                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas_id'].value);
                console.log("acompaniante[0]", this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0].value);
            
            }
            if(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]){
                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['id'].patchValue(this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas_id'].value);
                console.log("acompaniante[1]", this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1].value);

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

    cargarDatos() {
        if (this.reset_form()) {
            try {
                this.cargando = true;
                

                this.crudService.ver(this.id, "incidencias").subscribe(
                    resultado => {
                        this.cargando = false;
                        //validar todos los key que tengan el array                          
                        if(document.getElementById("catalogos"))

                            document.getElementById("catalogos").click();
                            this.iniciarFormulario();

                            console.log("valores form", resultado.data);
                            

                        this.dato.controls.id.patchValue(resultado.data.id);
                        this.dato.controls.clues.patchValue(resultado.data.clues);
                        this.dato.controls.motivo_ingreso.patchValue(resultado.data.motivo_ingreso);
                        this.dato.controls.impresion_diagnostica.patchValue(resultado.data.impresion_diagnostica);

                        this.dato.controls.pacientes['controls'][0]['controls']['id'].patchValue(resultado.data.pacientes[0]['id']);
                        this.dato.controls.pacientes['controls'][0]['controls']['personas_id'].patchValue(resultado.data.pacientes[0]['personas_id']);

                        this.dato.controls.pacientes['controls'][0]['controls']['personas']['controls']['id'].patchValue(resultado.data.pacientes[0]['personas']['id']);
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
                        this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes'] = this.fb.array([]);
                        resultado.data.pacientes[0]['acompaniantes'].forEach(element => {
                            if(!this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont]){
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][cont] = this.fb.group({                                    
                                    id:[''],
                                    personas_id: [''],
                                    parentescos_id: ['', [Validators.required]],
                                    esResponsable: [1],
                                    personas: this.fb.group({
                                        id:[''],
                                        nombre: ['', [Validators.required]],
                                        paterno: ['', [Validators.required]],
                                        materno: ['', [Validators.required]],
                                        telefono: ['', [Validators.required]],
                                        domicilio: ['', [Validators.required]],
                                        fecha_nacimiento: [null],
                                    }),
                                });
                            }
                            
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
                        /*if(this.dato.controls.pacientes['controls'][0]){
                            if(resultado.data.pacientes[0]['acompaniantes'][0]){

                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['id']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas_id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['personas_id']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['esResponsable'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['esResponsable']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['parentescos_id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['parentescos_id']);
                                
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['personas']['id']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['nombre'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['personas']['nombre']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['paterno'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['personas']['paterno']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['materno'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['personas']['materno']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['telefono'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['personas']['telefono']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][0]['controls']['personas']['controls']['domicilio'].patchValue(resultado.data.pacientes[0]['acompaniantes'][0]['personas']['domicilio']);
                            }
                        
                            if(resultado.data.pacientes[0]['acompaniantes'][1]){

                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['id']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas_id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['personas_id']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['esResponsable'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['esResponsable']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['parentescos_id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['parentescos_id']);
                                
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['id'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['personas']['id']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['nombre'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['personas']['nombre']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['paterno'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['personas']['paterno']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['materno'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['personas']['materno']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['telefono'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['personas']['telefono']);
                                this.dato.controls.pacientes['controls'][0]['controls']['acompaniantes']['controls'][1]['controls']['personas']['controls']['domicilio'].patchValue(resultado.data.pacientes[0]['acompaniantes'][1]['personas']['domicilio']);
                            }
                        }*/
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['id'].patchValue(resultado.data.movimientos_incidencias[0]['id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['subcategorias_cie10_id'].patchValue(resultado.data.movimientos_incidencias[0]['subcategorias_cie10_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['ubicaciones_pacientes_id'].patchValue(resultado.data.movimientos_incidencias[0]['ubicaciones_pacientes_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['triage_colores_id'].patchValue(resultado.data.movimientos_incidencias[0]['triage_colores_id']);
                        this.dato.controls.movimientos_incidencias['controls'][0]['controls']['turnos_id'].patchValue(resultado.data.movimientos_incidencias[0]['turnos_id']);
                        
                        
                
                    },
                    error => {                       
                    }
                );
            } catch (e) {
                console.log(0, e);
            }
        }
    }

    //   checked(value){
    //     if( (<HTMLInputElement>document.getElementById('checar')).checked == true ){
    //       this.mostrar= true;
    //     }
    //     else if( (<HTMLInputElement>document.getElementById('checar')).checked == false)
    //       this.mostrar= false;
    // }

    autovalor_municipio() {
        setTimeout(() => {
          this.municipios_id = this.temp_municipios_id;
        }, 3000);
    }

    autovalor_localidad() {
        setTimeout(() => {
          this.localidades_id = this.temp_localidades_id;
        }, 3000);
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

            console.log(po1);

            console.log(pac);

        }


    }
    private dateChanged(newDate) {
        this.selectedDeal.EndDate= new Date(newDate);
        console.log(this.selectedDeal.EndDate); // <-- for testing
      }


    quitar_form_array(modelo, i: number) {
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

    select_datosPaciente_autocomplete(data: any) {
    if(data){
        //Se asigna en variables el formulario formulario reactivo, respecto si es un FormArray o un FormGroup
        const pacientes = <FormArray>this.dato.controls.pacientes;
        const posicion = <FormGroup>pacientes.controls[0];
        const personas = <FormGroup>posicion.controls.personas;

        //se le colocan los datos a los controles del html que estan asociados con el formulario reactivo, respecto a lo que traiga el parametro data.
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

    valorFormato_clue(data: any) {

        let html = `${data.clues} - ${data.nombre}`;
        return html;
    }

/////pestaña referencia//////

        
    valorFormato_origen(data: any)  {

        let html = `(${data.clues}) - ${data.nombre}`;
        return html;
    }

    valorFormato_destino(data: any)  {

        let html = `(${data.clues}) - ${data.nombre}`;
        return html;
    }
    
    autocompleMedicos = (data: any) => {
        
              let html = `<span>${data.nombre}</span>`;
              return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    valorFormato_medico(data: any)  {
        
            let html = `(${data.id}) - ${data.nombre}`;
            return html;
    }





    cancelarModal(id) {
        document.getElementById(id).classList.remove('is-active');
    }
      
    abrirModal(id){
        document.getElementById(id).classList.add('is-active');
    }

    



}