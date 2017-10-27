import { Component, OnInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';



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

    private municipios_id: number = null;
    private temp_municipios_id: number = null;

    private localidades_id: number = null;
    private temp_localidades_id: number = null;
    private selectedDeal;


    public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

    public personas_term: string = `${environment.API_URL}/personas-auto?term=:keyword`;

    public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

    ngOnInit() {

        this.dato = this.fb.group({

            id: [''],
            motivo_ingreso: ['', [Validators.required]],
            impresion_diagnostica: ['', [Validators.required]],
            clues: ['', [Validators.required]],
            estados_incidencias_id: [1],



            pacientes: this.fb.array([
                this.fb.group({
                    //pacientes[0] indice 0;
                    personas_id: [''],
                    //personas objeto
                    personas: this.fb.group({
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
                            personas_id: [''],
                            parentescos_id: ['', [Validators.required]],
                            esResponsable: [1],
                            //objeto
                            personas: this.fb.group({
                                nombre: ['', [Validators.required]],
                                paterno: ['', [Validators.required]],
                                materno: ['', [Validators.required]],
                                telefono: ['', [Validators.required]],
                                domicilio: ['', [Validators.required]],
                            }),
                        }),

                    ]),
                }),
            ]),


            movimientos_incidencias: this.fb.array([
                this.fb.group({
                    turnos_id: ['', [Validators.required]],
                    ubicaciones_pacientes_id: ['', [Validators.required]],
                    estados_pacientes_id: [1],
                    triage_colores_id: ['', [Validators.required]],
                    subcategorias_cie10_id: [1],
                    medico_reporta_id: [null],
                    indicaciones: [null],
                    reporte_medico: [null],
                    diagnostico_egreso: [null],
                    observacion_trabajo_social: [null],
                    metodos_planificacion_id: [null],
                }),
            ]),

        });

        //hacer igual al Json de responsable del formulario reactivo arriba.


        this.form_responsable =
            this.fb.group({
                //indice 0;
                personas_id: [''],
                parentescos_id: ['', [Validators.nullValidator]],
                esResponsable: [1],
            }),

            this.form_persona_responsable =
            this.fb.group({
                nombre: ['', [Validators.nullValidator]],
                paterno: ['', [Validators.nullValidator]],
                materno: ['', [Validators.nullValidator]],
                telefono: ['', [Validators.nullValidator]],
                domicilio: ['', [Validators.nullValidator]],
            }),

            this.generar_folio(this.dato.controls.id, true);

            console.log(this.dato);

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



}