import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { CrudService } from '../../../crud/crud.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'reporte-incidencia',
  templateUrl: './lista.component.html'
})

export class ReporteIncidenciaComponent{

  
  //VARIABLES PARA LISTAR
  datos: any[] = [];
  cargando: boolean = false;
  

  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  constructor(
    private crudService: CrudService,
    private fb: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _el: ElementRef,
  ){}

  
  tamano = document.body.clientHeight;
  private filtro;
  private orden;

  edo_incidencia: any [] = [];
  colores_triage: any [] = [];



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
          console.log(resultado);
            this.cargando = false;
            this.datos = resultado as any[];
            

        },
        error => {

        }
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

  imprimir(e) {

    console.log(this.edo_incidencia);

  }
}