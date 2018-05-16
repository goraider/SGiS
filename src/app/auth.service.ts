/**
* dependencias a utilizar
*/
import { Injectable, Compiler } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

/**
* ocupa el inyectable a utiliazar para otros
* componentes.
*/
@Injectable()

/**
* Esta clase muestra los elementos a interactuar
*/
export class AuthService {
  /**
  * Contiene los valores
  * de la Unidad Medica a Mostrar.
  * @type {number}
  */
  clues = localStorage.getItem("clues") ? JSON.parse(localStorage.getItem("clues")) : {clues: "", nombre: ""};

  /**
  * Contiene los
  * valores del ancabezado a mostrar en toda la aplicación
  * @type {number}
  */
  private headers = new Headers({ 'Content-Type': 'application/json', 'Disponible':  environment.OAUTH_DISPONIBLE, 'clues': this.clues.clues});
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private http: Http, private router: Router, private compiler: Compiler) { }

  /**
  * Este método evaluea el inicio de sesion, y varifica los datos
  * para checar que es lo que enviara al LocalStorage de la aplicación.
  * @param email contiene el correo electronico que ingrese el usuario.
  * @param password contiene la contraseña del usuario
  * @return void
  */
  login(email: string, password: string) {
    const url: string = 'signin';
    return this.http.post(`${environment.API_URL}/${url}`, JSON.stringify({ email: email, password: password }), { headers: this.headers }).map((response: Response) => {

      try{

      let json = response.json();
      if (json.access_token) {
        // Obtenemos el perfil del usuario antes iniciar sesión, para saber que configuración tenía en caso de que sea el mismo usuario
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('menu');
        localStorage.removeItem('permisos');
        localStorage.removeItem('server_info');
        localStorage.removeItem('clues');
        localStorage.removeItem('usuario_clues');
        
        

        var permisos = json.permisos;
        var menu = environment.MENU;
        var menu_autorizado = [];
				// Recorremos todo el menu y quitamos los elementos a los que no se tenga autorizacion

        for(var i in menu){
					for(var j = 0; j < menu[i].lista.length; j++){
						if(permisos.indexOf(menu[i].lista[j].key) == -1 ){						
							menu[i].lista.splice(j,1);
							j = 0;
						}
					}
				}

        menu.forEach(element => {
          if(permisos.indexOf(element.key) > -1 ){ 
            var existe = false; 
            menu_autorizado.forEach(m => {
              if(element.key == m.key)
                existe = true;
            });
            if(!existe)
					    menu_autorizado.push(element);
					}          
        });			
        	
				for(var i in menu){
					for(var j = 0; j < menu[i].lista.length; j++){            
						if(permisos.indexOf(menu[i].lista[j].key) > -1 ){	
              if(menu_autorizado.indexOf(menu[i]) <= 0){				
							  var existe = false; 
                menu_autorizado.forEach(m => {
                  if(menu[i].key == m.key)
                    existe = true;
                });
                if(!existe)
                  menu_autorizado.push(menu[i]);
              }
						}
					}
				}		
        
        localStorage.setItem('token', json.access_token);
        localStorage.setItem('usuario_clues', JSON.stringify(json.usuario_clues));       
        localStorage.setItem('usuario', JSON.stringify(json.usuario));
        localStorage.setItem('menu', JSON.stringify(menu_autorizado));
        localStorage.setItem('permisos', JSON.stringify(json.permisos));
        localStorage.setItem('server_info', JSON.stringify(json.server_info));

      }
    }catch(e){
      console.log(e);
    }
    });
  }
  /**
  * Este método actualiza el token de la aplicación
  * @return void
  */
  refreshToken() {
    const url: string = 'refresh-token?token=' + localStorage.getItem('token');
    return this.http.post(`${environment.API_URL}/${url}`, {}, { headers: this.headers }).map((response: Response) => {

      let json = response.json();
      if (json.access_token) {
        localStorage.removeItem('token');
        localStorage.setItem('token', json.access_tokenetab)
      }
    });
  }

  /**
  * Este método contiene realiza el cierre de sesion del usuario.
  * @param url contiene la url con la que se quedo al final.
  * @return void
  */
  logout(url: string = null) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario'); 
        localStorage.removeItem('clues'); 
        localStorage.removeItem('usuario_clues');         
        localStorage.removeItem('menu');
        localStorage.removeItem('permisos');
        localStorage.removeItem('server_info');

        this.compiler.clearCache();
        if (url != null) {
          this.router.navigate(['login'], { queryParams: { returnUrl: decodeURIComponent(url.replace(/\+/g, " ")) } });
        } else {
          this.router.navigate(['login']);
        }
  }

}