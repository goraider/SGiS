/**
* dependencias a utilizar
*/
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

/**
* Esta clase inicializa los metodos correspondientes.
*/
@Injectable()
export class CambiarEntornoService {
  
  /**
  * Cambia el entorno
  * @type {Subject}
  */
  private cambiarEntornoSource = new Subject<boolean>();
  
   /**
   * Cambia el entorno de acuerdo al observable
   * @type {cambiarEntornoSource}
   */
    entornoCambiado$ = this.cambiarEntornoSource.asObservable();
    
   /**
   * Cambia el entorno.
   * @return void
   */
   cambiarEntorno() {
      console.log("Cambiaste de entorno");
      this.cambiarEntornoSource.next(true);
   }

}
