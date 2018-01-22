import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'app/auth.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   oauth_disponible: boolean;
   credenciales: any = {};
   loading: boolean = false;
   returnUrl: string;
   mensaje: string = "";
   mostrarMensaje: boolean = false;
   configuracion;
   saludIdDisponible;
   API_PATH = environment.API_PATH;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.oauth_disponible = environment.OAUTH_DISPONIBLE;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.configuracion = JSON.parse(localStorage.getItem("configuracion"));
  }
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
