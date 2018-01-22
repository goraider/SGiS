import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';


@Component({
  selector: 'usuarios-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
   cambiarPassword: boolean = false;
   mostrarCambiarPassword: boolean = false;
   tab: number = 1;
   tieneid: boolean = false;

   estados_id: number = null;
   municipios_id: number = null;
   localidades_id: number = null;

   temp_estados_id: number = null;
   temp_municipios_id: number = null;
   temp_localidades_id: number = null;

   form_sis_usuarios_contactos;
   tamano;
   usuario;
   activar_super;

   clues_sel = [];
   sucursal_sel = [];

  cargando: boolean = false;

  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  constructor(private crudService: CrudService, private _sanitizer: DomSanitizer, private fb: FormBuilder, private route: ActivatedRoute) { }

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
      municipios_id: [''],
      localidades_id: [''],
      sis_usuarios_contactos: this.fb.array([]),
      sis_usuarios_clues: this.fb.array([]),
      // sis_usuarios_dashboards: this.fb.array([]),
      // sis_usuarios_reportes: this.fb.array([]),
      sis_usuarios_grupos: this.fb.array([]),
      sis_usuarios_notificaciones: this.fb.array([])
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

    var il = 0, ie = 0, im = 0, sue = 0;
    

    this.dato.controls.sis_usuarios_clues.valueChanges.
      subscribe(val => {
        if (val.length > 0 && sue == 0) {
          sue++;
          setTimeout(() => {
            this.verificar_clues();
          }, 1000);

        }
      });

    this.dato.controls.municipios_id.valueChanges.
      subscribe(val => {
        if (val && im == 0) {
          im++;
          this.temp_municipios_id = val;
        }
      });

      this.dato.controls.localidades_id.valueChanges.
      subscribe(val => {
        if (val && il == 0) {
          il++;
          this.temp_localidades_id = val;
        }
      });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();


  }
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

  limpiar_sucursales(clues, user) {
    if (!this.clues_sel[clues.id]) {
      clues.sucursales.forEach(element => {
        var i = 0;
        this.dato.get('sis_usuarios_sucursales').value.forEach(buscar => {
          if (buscar == element.id) {
            this.dato.get('sis_usuarios_sucursales').value.splice(i, 1);
          }
          i++;
        });
      });
    }
  }
  verificar_clues() {
    this.usuario.forEach(element => {
      element.sucursales.forEach(item => {
        if (JSON.stringify(this.dato.get('sis_usuarios_sucursales').value).indexOf(JSON.stringify({ sucursales_id: item.id, sis_usuarios_id: this.dato.get('id').value })) > -1)
          this.sucursal_sel[item.id] = true;
        else
          this.sucursal_sel[item.id] = false;
      });
      if (JSON.stringify(this.dato.get('sis_usuarios_clues').value).indexOf(JSON.stringify({ clues_id: element.id, sis_usuarios_id: this.dato.get('id').value })) > -1)
        this.clues_sel[element.id] = true;
      else
        this.clues_sel[element.id] = false;
    });
  }


  autocompleListFormatter = (data: any) => {
    let html = `<span>(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
  valorFormato_clue(data: any) {
    let html = `(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}`;
    return html;
  }
  select_clue_autocomplete(modelo, data) {
    console.log(data);
    const um =<FormArray> this.dato.controls.sis_usuarios_clues;
    if(data == ""){
      (<HTMLInputElement>document.getElementById('clues_busqueda')).value = "";
    }
    else{
      um.push(this.fb.group(data));
      (<HTMLInputElement>document.getElementById('clues_busqueda')).value = "";
    }

  }
  quitar_form_array(modelo, i) {
    modelo.removeAt(i);
  }
  
}