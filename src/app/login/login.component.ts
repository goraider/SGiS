/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'app/auth.service';
import { environment } from '../../environments/environment';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class LoginComponent implements OnInit {

   /**
   * Contiene la bandera  si 
   * el oauth esta disponible o no.
   * @type {boolean}
   */
   oauth_disponible: boolean;

   /**
   * Contiene el objeto con
   * las credenciales.
   * @type {any:object}
   */
   credenciales: any = {};
   
   /**
   * Contiene la bandera
   * para verificar si esta cargando.
   * @type {boolean}
   */
   loading: boolean = false;

   /**
   * Regresa la url obtenida.
   * @type {string}
   */
   returnUrl: string;

   /**
   * Muestra el msj a mostrar
   * @type {string}
   */
   mensaje: string = "";
   
   /**
   * Muestra la bandera
   * para mostrar el msj
   * @type {string}
   */
   mostrarMensaje: boolean = false;
   
   /**
   * Muestra la configuración
   * @type {string}
   */
   configuracion;

   /**
   * Muestra si esta disponible
   * salud id.
   * @type {any}
   */
   saludIdDisponible;

   /**
   * Contiene la ruta del Evironments
   * @type {string}
   */
   API_PATH = environment.API_PATH;
  
   /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) { }
  
  /**
  * Este método inicializa la carga de la vista asociada
  * @return void
  */
  ngOnInit() {
    this.oauth_disponible = environment.OAUTH_DISPONIBLE;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.configuracion = JSON.parse(localStorage.getItem("configuracion"));
  }
  /**
  * Este método realiza el
  * inicio de sesion al usuario.
  * @return void
  */
  login() {
    this.loading = true;
    this.mostrarMensaje = false;
    

    this.authService.login(this.credenciales.email, this.credenciales.password)
      .subscribe(

        data => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
          localStorage.removeItem('bloquear_pantalla');
        },
        error => {
          this.loading = false;
          this.mostrarMensaje = true;
          this.mensaje = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir. 10";
          try {
            let e = error.json();
            
            if (error.status == 401){
              this.mensaje = "Lo sentimos el usuario y/o contraseña no son válidos."
            }
            if (error.status == 403){
              this.mensaje = "Lo sentimos el usuario no esta autorizado."
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

}
