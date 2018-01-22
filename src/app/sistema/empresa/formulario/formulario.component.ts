import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'formulario-clues',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  tab = 1;
  tamano;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]]
    });
    this.route.params.subscribe(params => {
      if (!params['id']) {
        this.generarCadenaRandom();
      }
    });
  }
  generarCadenaRandom() {
        var cadena = "";
        var random = Math.floor(Math.random() * ((9999 * 50) - 1111)) + 50 + " ";

        for (var i = 0; i < 50; i++) {
            random = random + " " + Math.floor(Math.random() * ((9999 * 50) - 1111)) + 50;
        }
        var tiempo = Math.round(new Date().getTime() / 1000);

        cadena = "" + tiempo + random;
        cadena = btoa(cadena);
        cadena = cadena.substr(Math.floor(Math.random() * (100 - 10)) + 1, 50);
        if(cadena.length == 0)
          this.generarCadenaRandom();
        else
          this.dato.controls.id.patchValue(cadena);
    }

}