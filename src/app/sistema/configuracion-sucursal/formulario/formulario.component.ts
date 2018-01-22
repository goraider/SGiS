import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'formulario-sucursal',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
   tab = 1;
   tab2 = 1;
   tamano = document.body.clientHeight;
   form_contactos;
   form_redes_sociales;
   form_rfcs;

   CkeditorConfig = {
    height:document.body.clientHeight - 460
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [1],
      configuracion: this.fb.group({
        nombre: [''],
        telefono: [''],
        fax: [''],
        correo: [''],
        direccion: [''],
        reintegro: [''],
        mensaje: [''],
        privacidad: [''],
        mision: [''],
        vision: [''],
        quienes: [''],
        valores: [''],
        historia: [''],
        sitio: [''],
        url: [''],
        moneda: [''],
        folioT: [''],
        folioE: [''],
        recibo: [''],
        lote_venta:[''],
        logo: [''],
        fondo: [''],
        utilidad: [''],
        intro_redes: [''],
        iframe_map: [''],

        video_promocional: this.fb.group({
          videoURL: ['j2rtMnB3oIg'],
          autoPlay: ['1'],
          startAt: ['6'],
          mute: ['1'],
          opacity: ['0.69'],
          containment: ['.top_slider']
        }),
        pensamientos: this.fb.array([]),
        contactos: this.fb.array([]),
        redes_sociales: this.fb.array([]),
        facturacion: this.fb.array([])
      })
    });

    this.form_contactos = {
      tipos_medios_id: ['1'],
      valor: ['', [Validators.required]]
    };

    this.form_redes_sociales = {
      tipos_redes_sociales_id: ['1'],
      valor: ['', [Validators.required]]
    };

    this.form_rfcs = {
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
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
    var c = 0;
    this.dato.controls.configuracion.valueChanges.subscribe(val => {
      if(val.nombre && c == 0){
        c++;
        setTimeout(()=> {
          const ctrl = <FormGroup> this.dato.controls.configuracion;
          ctrl.controls.quienes.patchValue(this.dato.get('configuracion').value.quienes);
          ctrl.controls.mision.patchValue(this.dato.get('configuracion').value.mision);
          ctrl.controls.vision.patchValue(this.dato.get('configuracion').value.vision);
          ctrl.controls.historia.patchValue(this.dato.get('configuracion').value.historia);
          ctrl.controls.valores.patchValue(this.dato.get('configuracion').value.valores);
          ctrl.controls.privacidad.patchValue(this.dato.get('configuracion').value.privacidad);
        }, 500);
      }
    });
  }  
}