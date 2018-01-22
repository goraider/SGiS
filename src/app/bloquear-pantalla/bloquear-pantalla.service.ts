import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class BloquearPantallaService {
    bloquearPantallaSource = new Subject<boolean>();

    pantallaBloqueada$ = this.bloquearPantallaSource.asObservable();
    
    bloquearPantalla() {
      localStorage.removeItem('bloquear_pantalla');
      localStorage.setItem('bloquear_pantalla', "true");
      this.bloquearPantallaSource.next(true);
    }
    desbloquearPantalla() {
      localStorage.removeItem('bloquear_pantalla');
      this.bloquearPantallaSource.next(false);
    }
}
