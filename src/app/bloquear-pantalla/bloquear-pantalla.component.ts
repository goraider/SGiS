/**
* dependencias a utilizar
*/
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { BloquearPantallaService }     from './bloquear-pantalla.service';
import { environment } from '../../environments/environment';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-bloquear-pantalla',
  templateUrl: './bloquear-pantalla.component.html',
  styleUrls: ['./bloquear-pantalla.component.css']
})

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class BloquearPantallaComponent implements OnInit {
  
  /**
  * Contiene los datos del usuario.
  * @type {any}
  */
  usuario: any = {};
  
  /**
  * Bandera si cuenta con salud id.
  * @type {boolean}
  */
  saludIdDisponible: boolean;

  /**
  * Bandera si cuenta con salud id.
  * @type {any}
  */
  credenciales: any = {};

  /**
  * Bandera si ha cargado los datos o no.
  * @type {boolean}
  */
  loading: boolean = false;

  /**
  * Mnsaje a mostrar.
  * @type {string}
  */
  mensaje: string = "";

  /**
  * Bandera para mostrar o no el mensaje.
  * @type {boolean}
  */
  mostrarMensaje: boolean = false;
  
  /**
  * Bandera para mostrar elementos.
  * @type {boolean}
  */
  mostrar:Boolean;
  
  /**
  * Bandera que subscribe el bloqueo
  * de pantalla.
  * @type {Subscription}
  */
  bloquearPantallaSuscription: Subscription;

  /**
  * Bandera que muestra la ruta del PATH
  * del environments.
  * @type {any}
  */
  API_PATH = environment.API_PATH;
  
  /**
  * Contiene la configuracion
  * del LocalStorage.
  * @type {any}
  */
  configuracion;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(
    private router: Router,
    private authService:AuthService,
    private bloquearPantallaService: BloquearPantallaService
  ) {
    this.bloquearPantallaSuscription = bloquearPantallaService.pantallaBloqueada$.subscribe(bloquear => {
      // Borramos el token porque de todos modos se va a sustituir
      // y así impedimos que intenten borrar elementos en el navegador para acceder
      if(bloquear){
        localStorage.removeItem('token');
        this.cargarCredenciales();
        this.mostrar = true 
      }
      
    });
  }

  /**
  * Este método inicializa la carga de la vista asociada
  * @return void
  */
  ngOnInit() { 
    let bloquear = localStorage.getItem("bloquear_pantalla"); 
    if(bloquear != null){
      this.cargarCredenciales();
      this.mostrar = true 
    }   
    this.configuracion = JSON.parse(localStorage.getItem("configuracion"));
  }
 
  /**
  * Este método carga las credenciales
  * del usuario, respecto al localStorage.
  * @return void
  */
  cargarCredenciales(){
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    if(this.usuario != null && this.usuario.email != null){
      this.credenciales.email = this.usuario.email;
    } 
  }

  /**
  * Este método realizar nuevamente
  * el inicio de sesion al usuario.
  * @return void
  */
  login() {
    this.loading = true;
    this.mostrarMensaje = false;
    
    this.authService.login(this.credenciales.email, this.credenciales.password)
      .subscribe(
        data => {
          this.loading = false;
          this.mostrar = false;
          this.credenciales.password = "";
          if(document.getElementById("cargar_datos_actualizar"))
            document.getElementById("cargar_datos_actualizar").click();
          this.bloquearPantallaService.desbloquearPantalla(); 
        },
        error => {
          this.loading = false;
          this.mostrarMensaje = true;
          this.mensaje = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir. 1";
          try {
            let e = error.json(); 
            if (error.status == 401){
              this.mensaje = "Lo sentimos el usuario y/o contraseña no son válidos."
            }

            if (error.status == 0){
              this.mensaje = "Conexión rechazada."
            }

            if (error.status == 500 ){
              this.mensaje = "500 (Error interno del servidor)";
            } 
          } catch(e){
            if (error.status == 500 ){
              this.mensaje = "500 (Error interno del servidor)";
            } 
          }
          
        }
      );
  }

  /**
  * Este método realizar el cierre
  * de sesion al usuario.
  * @return void
  */
  logout() {
    this.mostrar = false 
    localStorage.removeItem('bloquear_pantalla');
    this.authService.logout();
  }

}
