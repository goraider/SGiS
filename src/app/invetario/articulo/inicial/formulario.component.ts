import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

import { CrudService } from '../../../crud/crud.service';

@Component({
  selector: 'inicial-formulario',
  templateUrl: './formulario.component.html'
})

export class InicialComponent {
  dato: FormGroup;

  private cargando: boolean = false;
  tamano = document.body.clientHeight;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private crudService: CrudService) { }

  ngOnInit() {
    this.dato = this.fb.group({
      tipos_movimientos_id: [7],
      status_movimientos_id: 1,
      movimientos_articulos: this.fb.array([])
    });
    this.cargarArticulos();
  }
  json_articulos;
  cat = [];
  cargarArticulos(iniciar = "") {
    this.reset_form();
    this.cargando = true;
    this.dato.controls.tipos_movimientos_id.patchValue(7);
    this.dato.controls.status_movimientos_id.patchValue(1);
    var url = 'articulos-stock-inicial';
    if(iniciar != "")
      url += "?iniciar";
    this.json_articulos = [];
    document.getElementById("cerra_restablecer").click();
    this.crudService.lista(0, 0, url).subscribe(
      resultado => {
        var c = 0;
        this.json_articulos = resultado.data;
        this.json_articulos.forEach(element => {
          element.contador = c;
          var categorias = element.categorias;
          if (!element.categorias)
            categorias = { "nombre": "Sin categoria" };
          element.categorias = categorias;
          this.cat[c] = false;
          c++;
        });
        c = 0;
        resultado.data.forEach(item => {
          item.precio_venta = '';
          item.contador = c;
          item.lotes = this.fb.array([]);

          const a: FormArray = <FormArray>this.dato.controls.movimientos_articulos;
          a.controls.push(this.fb.group(item));
          this.agregar_lote(c);
          c++;
        });

        this.cargando = false;
      },
      error => {
        this.cargando = false;
      }
    );
  }
  guardado = false;
  error = false;
  guardarDatos(regresar, reset_form) {

    this.cargando = true;
    this.guardado = false;
    this.error = false;
    var json = this.dato.getRawValue();
    this.crudService.crear(json, 'articulos-stock-inicial').subscribe(
      resultado => {
        this.guardado = true;
        setTimeout(function () {
          this.guardado = false;
        }, 2500);
        this.cargarArticulos();
      },
      error => {
        this.error = true;
        setTimeout(function () {
          this.error = false;
        }, 3000);
      }
    );
  }
  initLote() {
    return this.fb.group({
      lote: ['', [Validators.required]],
      fecha_caducidad: [''],
      existencia: ['', [Validators.required]],
      precio_unitario: ['']
    })
  }

  agregar_lote(i?: number) {
    const a: FormArray = <FormArray>this.dato.controls.movimientos_articulos;
    const control: FormArray = <FormArray>a.controls[i];
    var lote: FormArray = <FormArray>control.controls['lotes'];
    if (!lote.controls)
      lote = this.fb.array([]);
    lote.controls.push(this.initLote());
  }

  quitar_lote(i, i2) {
    const a: FormArray = <FormArray>this.dato.controls.movimientos_articulos;
    const control: FormArray = <FormArray>a.at(i).get('lotes');
    control.removeAt(i2);
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
}