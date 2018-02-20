import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { CrudService } from '../../../crud/crud.service';
import { environment } from '../../../../environments/environment';

import * as jsPDF from 'jspdf';

import * as moment from 'moment';

@Component({
  selector: 'reporte-incidencia',
  templateUrl: './lista.component.html'
})

export class ReporteEstadoFuerzaComponent{

  
  //VARIABLES PARA LISTAR
  datos: any[] = [];
  cargando: boolean = false;

  fecha_inicio = "";
  fecha_fin = "";
  clues = "";
  turno = "";
  busquedaActivada;
  turn;
  false;
  url;
  

  clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;


  constructor(
    private crudService: CrudService,
    private fb: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _el: ElementRef,
  ){}

  
  tamano = document.body.clientHeight;
   rangos_fecha;
   filtro;
   orden;

  //edo_incidencia: any [] = [];
  //colores_triage: any [] = [];



  ngOnInit(){


    document.getElementById("catalogos").click();



    
  }

  cargarCatalogo(item, url) {
    this.crudService.lista(0, 0, url).subscribe(
      resultado => {
        this[item] = resultado.data;
      },
      error => {

      }
    );
  }


  listar(url): void {
    
    this.cargando = true;
    this.crudService.lista_general(url).subscribe(
        resultado => {
          console.log("e.fuerza", resultado);
            this.cargando = false;
            this.datos = resultado as any[];
            

        },
        error => {

        }
    );
}

lista_incidencias(url){
 

    this.listar('reportes/estado-fuerza?fecha_inicio='+this.fecha_inicio+'&fecha_fin='+
    this.fecha_fin+'&clues='+this.clues+'&turno='+this.turno
    );

}


select_item_autocomplete(modelo, item, datos, esmodelo: boolean = false) {        
  if (!esmodelo)
      modelo = datos[item];
  else{
      if(datos)
          modelo.patchValue(datos[item]);        
  }
}



  autocompleListFormatter = (data: any) => {
    
      let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
  }
    
  valorFormato_clue(data: any,) {

      let html = `${data.clues}`;
      return html;

      

  }


  imprimir_pdf(datos) {
  
    let pdf = new jsPDF();

    //var i =  0;
    datos.forEach(folios => {

      pdf.setFontSize(12)
      pdf.setFont('times')
      pdf.setFontType('bold')
      pdf.text(20, 60, 'N° Folio:');
      pdf.setFontType('normal');
      pdf.text(40, 60, folios.id);

    });

    pdf.save('folio');
    

  }
}