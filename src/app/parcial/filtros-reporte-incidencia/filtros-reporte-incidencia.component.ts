import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CrudService } from '../../crud/crud.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { ListarComponent } from '../../crud/listar.component';


import * as moment from 'moment';

@Component({
  selector: 'filtros-reporte-incidencia',
  templateUrl: 'filtros-reporte-incidencia.component.html'
})

export class FiltrosReporteIncidenciaComponent{

  @Input() ctrl: any;

  @Input() clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _el: ElementRef,
    private crudService: CrudService
  ) { }
  

    private permisos;
    private rangos_fecha;
    private tipo_rango = 1;
    fecha_inicial;
    fecha_final;
    tipo_venta;
    private carpeta;
    private modulo;
    private controlador;
    private modulo_actual;
    private icono;

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

    document.getElementById("catalogos").click();

  
  }
  get_url(){
    console.log(<HTMLFormElement>document.getElementById('rango_fecha'),<HTMLFormElement>document.getElementById('rango_fecha').children[0] );
    console.log(<HTMLFormElement>document.getElementById('fecha_inicial') );
  }

  autocompleListFormatter = (data: any) => {
    
      let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
  }
    
  valorFormato_clue(data: any,) {

      let html = `${data.nombre}`;
      return html;

  }


}