/**
* dependencias a utilizar
*/
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
* selector del pipe a colocar.
*/
@Pipe({name: 'formatoHtml'})

/**
* Esta clase inicializa lo que se vaya
* a filtrar.
*/
export class formatoHtmlPipe {
    
    /**
    * Este método inicializa la carga de las dependencias 
    * que se necesitan para el funcionamiento del catalogo
    */
    constructor(private sanitizer: DomSanitizer) {}

    /**
    * Este método busca elementos.
    * @param style elemento que tiene el formato HTML a convertir.
    * @return void
    */
  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}