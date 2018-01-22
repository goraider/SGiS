import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'filtros-reportes',
  templateUrl: 'filtros-reportes.component.html'
})

export class FiltrosReportesComponent{
  
  @Input() ctrl: any; 

  permisos;
  rangos_fecha;
  tipo_rango = 1;
  fecha_inicial;
  fecha_final;
  tipo_venta;
  carpeta;
  modulo;
  controlador;
  modulo_actual;
  icono;
  busquedaActivada;
  tipos_movimientos;
  cargando;
  rango_fecha;

  ngOnInit() {
    var url = location.href.split("/");


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

  
  }
  get_url(){
    console.log(<HTMLFormElement>document.getElementById('rango_fecha'),<HTMLFormElement>document.getElementById('rango_fecha').children[0] );
    console.log(<HTMLFormElement>document.getElementById('fecha_inicial') );
  }
}