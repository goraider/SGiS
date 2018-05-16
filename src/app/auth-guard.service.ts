/**
* dependencias a utilizar
*/
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


/**
* ocupa el inyectable a utiliazar para otros
* componentes.
*/
@Injectable()

/**
* Esta clase muestra los elementos a interactuar
*/
export class AuthGuard implements CanActivate {
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private router: Router) { }
  
  /**
  * Este método que activa la ruta en el la que nos redirije
  * al token obtenido.
  * @param route contiene la ruta a activar.
  * @param state contiene el estado de la ruta.
  * @return void
  */
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    }

    // Si llega a este punto no está loggeado lo mandamos a login pero con el url ingresado
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
