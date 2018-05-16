/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'usuarios-perfil',
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
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
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
      municipios_id: ['', [Validators.required]],
      localidades_id: ['', [Validators.required]],
      sis_usuarios_contactos: this.fb.array([]),
      grupos: this.fb.array([])
    });

    this.form_sis_usuarios_contactos = {
      tipos_medios_id: ['1'],
      valor: ['', [Validators.required]]
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
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();    
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

}