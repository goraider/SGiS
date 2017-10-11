import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'articulo-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  
  private tab: number = 1;
  private tieneid: boolean = false;

  private categorias_id: number = null;
  private presentaciones_id: number = null;
  private unidades_medidas_id: number = null;

  private temp_categorias_id: number = null;
  private temp_presentaciones_id: number = null;
  private temp_unidades_medidas_id: number = null;

  private form_articulos_precios;
  private form_articulos_descuentos;
  private form_articulos_promociones;
  private form_articulos_cupones;
  private form_articulos_imagenes;
  private form_articulos_impuestos;
  private tamano;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dato = this.fb.group({
      clave: [''],
      nombre: ['', [Validators.required]],
      descripcion: [''],
      cantidad_x_envase: ['', [Validators.required]],
      codigo_barras: [''],
      es_fraccionable: [''],
      categorias_id: [''],
      presentaciones_id: [''],
      unidades_medidas_id: [''],
      articulos_maximos_minimos: this.fb.group({
        minimo: [1, [Validators.required]],
        maximo: [2, [Validators.required]]
      }),
      articulos_precios: this.fb.array([]),
      articulos_imagenes: this.fb.array([]),
      articulos_cupones: this.fb.array([]),
      articulos_impuestos: this.fb.array([]),
      articulos_promociones: this.fb.array([]),
      articulos_descuentos: this.fb.array([])
    });

    this.form_articulos_precios = {
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      activo: [0]
    };

    this.form_articulos_descuentos = {
      nombre: ['', [Validators.required]],
      porcentaje_descuento: ['', [Validators.required]],
      inicio_vigencia: ['', [Validators.required]],
      fin_vigencia: ['', [Validators.required]],
      activo: [0]
    };

    this.form_articulos_promociones = {
      nombre: ['', [Validators.required]],
      tipo_promocion: ['NULL', [Validators.required]],
      cantidad_minima: [''],
      cantidad_cobrar: [''],
      monto_minimo: [''],
      porcentaje_descuento: [''], 
      es_acumulable: [0],   
      con_otros_descuentos: [0],  
      activo: [0]
    };

    this.form_articulos_cupones = {
      codigo: ['', [Validators.required]],
      porcentaje_descuento: ['', [Validators.required]],
      inicio_vigencia: ['', [Validators.required]],
      fin_vigencia: ['', [Validators.required]],
      con_otros_descuentos: [0],
      utilizado: [0]
    };

    this.form_articulos_impuestos = {
      impuestos_id: ['', [Validators.required]]
    };

    this.form_articulos_imagenes = {
      imagen: ['', [Validators.required]]
    };

    this.tamano = document.body.clientHeight;

    var ip = 0, ie = 0, im = 0;
    this.dato.controls.categorias_id.valueChanges.
      subscribe(val => {
        if(val && ip == 0){
          ip++;
          this.temp_categorias_id = val;
        }
    });

    this.dato.controls.presentaciones_id.valueChanges.
      subscribe(val => {
        if(val && ie == 0){
          ie++;
          this.temp_presentaciones_id = val;
        }
    });

    this.dato.controls.unidades_medidas_id.valueChanges.
      subscribe(val => {
        if(val && im == 0){
          im++;
          this.temp_unidades_medidas_id = val;
        }
    });
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click(); 

  }

  autovalor_categoria(){
    setTimeout(() => {
      this.categorias_id = this.temp_categorias_id;
    }, 2000);
  }

  autovalor_presentacion(){
    setTimeout(() => {
      this.presentaciones_id = this.temp_presentaciones_id;
    }, 3000);
  }
  autovalor_unidad_medida(){
    setTimeout(() => {
      this.unidades_medidas_id = this.temp_unidades_medidas_id;
    }, 3000);
  }

}