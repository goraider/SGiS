import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'usuarios-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  tab = 1;
  tamano;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [1],
      configuracion: {
        nombre: [''],
        telefono: [''],
        fax: [''],
        correo: [''],
        direccion: [''],
        reintegro: [''],
        privacidad: [''],
        mision: [''],
        vision: [''],
        quienes: [''],
        historia: [''],
        sitio: [''],
        url: [''],
        moneda: [''],
        iva: [''],
        isr: [''],
        etiqueta: [''],
        folioT: [''],
        folioE: [''],
        recibo: [''],
        logo: [''],
        fondo: [''],
        utilidad: [''],
        intro_redes: [''],
        iframe_map: [''],

        video_promocional: {
          videoURL: ['j2rtMnB3oIg'],
          autoPlay: ['1'],
          startAt: ['6'],
          mute: ['1'],
          opacity: ['0.69'],
          containment: ['.top_slider']
        },
        valores: [''],
        publicaciones: [''],
        pensamientos: this.fb.array([]),
        contactos: this.fb.array([]),
        redes_sociales: this.fb.array([]),
        facturacion: this.fb.array([]),
        fondo_equipo: this.fb.array([])
      }
    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();
  }

}