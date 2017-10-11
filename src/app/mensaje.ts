import { Observable } from 'rxjs';

export class Mensaje {
    titulo: string = "";
    texto: string = "";
    mostrar:boolean = false;
    clase: string = "";
    cuentaAtras:number = 6;

    constructor(autodestruccion:boolean = false, cuentaAtras: number = 6){
        if(autodestruccion){
            this.iniciarCuentaAtras();
        }
        this.cuentaAtras = cuentaAtras;        
    }
    
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