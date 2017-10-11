import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    }

    // Si llega a este punto no está loggeado lo mandamos a login pero con el url ingresado
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
