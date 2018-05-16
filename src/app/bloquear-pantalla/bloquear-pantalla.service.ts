/**
* dependencias a utilizar
*/
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
@Injectable()
export class BloquearPantallaService {
    /**
    * Contiene la variable para
    * el bloqueo de pantalla.
    * @type {Subject}
    */
    bloquearPantallaSource = new Subject<boolean>();
    /**
    * Contiene el observable para
    * el bloqueo de pantalla se active.
    * @type {Subject}
    */
    pantallaBloqueada$ = this.bloquearPantallaSource.asObservable();
    
    /**
    * Metodo que envia al localstorage
    * para bloquear la pantalla.
    * @returns void
    */
    bloquearPantalla() {
      localStorage.removeItem('bloquear_pantalla');
      localStorage.setItem('bloquear_pantalla', "true");
      this.bloquearPantallaSource.next(true);
    }

    /**
    * Metodo que envia al localstorage
    * para desbloquear la pantalla.
    * @returns void
    */
    desbloquearPantalla() {
      localStorage.removeItem('bloquear_pantalla');
      this.bloquearPantallaSource.next(false);
    }
}
