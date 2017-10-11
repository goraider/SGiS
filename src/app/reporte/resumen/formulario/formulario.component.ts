import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'impuesto-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  private rangos_fecha;
  tamano = document.body.clientHeight;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({    
      rango_fecha: [''],
      tipo_rango: [''],
      fecha_inicial: [''],
      fecha_final: ['']  
    }); 

    this.rangos_fecha = [
      {'id': moment().format('YYYY-MM-DD')+'/'+moment().format('YYYY-MM-DD'), 'nombre':'Hoy'},
      {'id': moment().subtract(1, 'days').format('YYYY-MM-DD')+'/'+moment().subtract(1, 'days').format('YYYY-MM-DD'), 'nombre': 'Ayer'},
      {'id': moment().subtract(7, 'days').format('YYYY-MM-DD')+'/'+moment().format('YYYY-MM-DD'), 'nombre': 'Últimos 7 días'},
      {'id': moment().startOf('month').format('YYYY-MM-DD')+'/'+moment().endOf('month').format('YYYY-MM-DD'), 'nombre': 'Este mes'},
      {'id': moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD')+'/'+moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'), 'nombre': 'Mes pasado'},
      {'id': moment().startOf('year').format('YYYY-MM-DD')+'/'+moment().endOf('year').format('YYYY-MM-DD'), 'nombre': 'Este año'},
      {'id': moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD')+'/'+moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'), 'nombre': 'Año pasado'},
      {'id': moment('1969-01-01', 'YYYY-MM-DD', true).format('YYYY-MM-DD')+'/'+moment().format('YYYY-MM-DD'), 'nombre': 'Todos los tiempos'}
    ];
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();  
  }
  
}