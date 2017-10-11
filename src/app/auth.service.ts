import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { environment } from '../environments/environment';


@Injectable()
export class AuthService {
  clues = localStorage.getItem("clues") ? JSON.parse(localStorage.getItem("clues")) : {clues: "", nombre: ""};
  private headers = new Headers({ 'Content-Type': 'application/json', 'Disponible':  environment.OAUTH_DISPONIBLE, 'clues': this.clues.clues});

  constructor(private http: Http, private router: Router) { }

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

  logout(url: string = null) {
    localStorage.removeItem('token');
        localStorage.removeItem('usuario'); 
        localStorage.removeItem('clues'); 
        localStorage.removeItem('usuario_clues');         
        localStorage.removeItem('menu');
        localStorage.removeItem('permisos');
        localStorage.removeItem('server_info');

    if (url != null) {
      this.router.navigate(['login'], { queryParams: { returnUrl: decodeURIComponent(url.replace(/\+/g, " ")) } });
    } else {
      this.router.navigate(['login']);
    }
  }

}