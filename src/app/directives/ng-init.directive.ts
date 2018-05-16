/**
* dependencias a utilizar
*/
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
* su selector a ocupar.
*/
@Directive({
    selector: '[ngInit]'
})

/**
* Esta clase muestra los elementos a interactuar
*/
export class NgInit {
    /**
    * Contiene el objeto
    * con los valores.
    * @type {any}
    */
    @Input() values: any = {};
    
    /**
    * Contiene el valor
    * para ejecutar el metodo ngOnInit.
    * @type {any}
    */
    @Input() ngInit;
    
    /**
    * Este método se dispara al iniciar la carga de la vista asociada
    * @return void
    */
    ngOnInit() {
        if (this.ngInit) { this.ngInit(); }
    }
    
}