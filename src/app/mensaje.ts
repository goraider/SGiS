/**
* dependencias a utilizar
*/
import { Observable } from 'rxjs';

/**
* Esta clase inicializa el mensaje
* a mostrar en las operaciones del sistema.
*/
export class Mensaje {

    /**
    * Contiene los datos del titulo
    * del modulo.
    * @type {string}
    */
    titulo: string = "";
    
    /**
    * Contiene el texo a mostrar abajo del titulo.
    * @type {string}
    */
    texto: string = "";

    /**
    * Contiene bandera para mostrar el mensaje.
    * @type {boolean}
    */
    mostrar:boolean = false;

    /**
    * Contiene bandera para mostrar el mensaje.
    * @type {string}
    */
    clase: string = "";

    /**
    * Contiene la cuenta
    * en la cual durara el mensaje a mostrar.
    * @type {number}
    */
    cuentaAtras:number = 6;

    /**
    * Este método inicializa la carga de las dependencias 
    * que se necesitan para el funcionamiento del catalogo
    */
    constructor(autodestruccion:boolean = false, cuentaAtras: number = 6){
        if(autodestruccion){
            this.iniciarCuentaAtras();
        }
        this.cuentaAtras = cuentaAtras;        
    }

    /**
    * Este método inicializa un tiepo para mostrar el mensaje
    * @return void
    */
    iniciarCuentaAtras = function(){
        let finish = Observable.timer(7000);
        let timer = Observable.timer(0,1000).takeUntil(finish);
        timer.subscribe(t => {
            this.cuentaAtras -= 1;

            if (this.cuentaAtras < 0){
                this.cuentaAtras = 6;
                this.mostrar = false;
            }
        });

    }
}