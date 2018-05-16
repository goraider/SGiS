/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { BloquearPantallaService }     from '../bloquear-pantalla/bloquear-pantalla.service';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})

/**
* Esta clase inicializa el perfil con sus metodos.
*/
export class PerfilComponent implements OnInit {
  
  /**
  * Contiene la bandera para mostrar un
  * elemento.
  * @type {boolean}
  */
  mostrar: boolean = false;

  /**
  * Contiene los datos
  * del usuario.
  * @type {any}
  */
  usuario: any = {};
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(
    private router: Router,
    private authService:AuthService,
    private bloquearPantallaService: BloquearPantallaService,
  ) { }

  /**
  * Este método inicializa la carga de la vista asociada
  * @return void
  */
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }

  /**
  * Metodo que contiene los datos del usuario.
  * @return void
  */
  toggle() {
    this.mostrar = !this.mostrar;
    if(this.mostrar){
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
  }

  /**
  * Metodo que cierra la sesion del usuario.
  * @return void
  */
  logout() {
    this.authService.logout();
     this.router.navigate(['/login']);
  }

  /**
  * Metodo que bloquea la pantalla.
  * @return void
  */
  bloquear(){
   
    this.bloquearPantallaService.bloquearPantalla();
    this.mostrar = false;
  }
}
