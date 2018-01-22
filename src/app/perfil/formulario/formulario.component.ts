import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'usuarios-perfil',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  cambiarPassword: boolean = false;
  mostrarCambiarPassword: boolean = false;
  tab: number = 1;
  tieneid: boolean = false;

  paises_id: number = null;
  estados_id: number = null;
  municipios_id: number = null;

  temp_paises_id: number = null;
  temp_estados_id: number = null;
  temp_municipios_id: number = null;

  form_sis_usuarios_contactos;
  form_sis_usuarios_rfcs;
  tamano;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      cambiarPassword: [false, []],
      password: [{ value: '', disabled: true }, [Validators.required]],
      confirmarPassword: [{ value: '', disabled: true }, [Validators.required]],
      foto: [''],
      avatar: [''],
      username: [''],
      direccion: [''],
      colonia: [''],
      numero_exterior: [''],
      numero_interior: [''],
      spam: [''],
      codigo_postal: [''],
      last_login: [''],
      activo: [''],
      paises_id: [''],
      estados_id: [''],
      municipios_id: [''],
      sis_usuarios_contactos: this.fb.array([]),
      sis_usuarios_rfcs: this.fb.array([]),
      grupos: this.fb.array([])
    });

    this.form_sis_usuarios_contactos = {
      tipos_medios_id: ['1'],
      valor: ['', [Validators.required]]
    };

    this.form_sis_usuarios_rfcs = {
      tipo_persona: ['Fisica', [Validators.required]],
      rfc: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      paises_id: [''],
      estados_id: [''],
      municipios_id: [''],
      localidad: [''],
      colonia: [''],
      calle: [''],
      numero_exterior: [''],
      numero_interior: [''],
      codigo_postal: [''],
      email: ['']
    };
    this.tamano = document.body.clientHeight;
    
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

    var ip = 0, ie = 0, im = 0;
    this.dato.controls.paises_id.valueChanges.
      subscribe(val => {
        if(val && ip == 0){
          ip++;
          this.temp_paises_id = val;
        }
    });

    this.dato.controls.estados_id.valueChanges.
      subscribe(val => {
        if(val && ie == 0){
          ie++;
          this.temp_estados_id = val;
        }
    });

    this.dato.controls.municipios_id.valueChanges.
      subscribe(val => {
        if(val && im == 0){
          im++;
          this.temp_municipios_id = val;
        }
    });
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();    
  }
  autovalor_pais(){
    setTimeout(() => {
      this.paises_id = this.temp_paises_id;
    }, 2000);
  }
  autovalor_estado(){
    setTimeout(() => {
      this.estados_id = this.temp_estados_id;
    }, 3000);
  }
  autovalor_municipio(){
    setTimeout(() => {
      this.municipios_id = this.temp_municipios_id;
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

}