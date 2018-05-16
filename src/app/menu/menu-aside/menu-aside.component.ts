/**
* dependencias a utilizar
*/
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'sistema-menu-aside',
  templateUrl: './menu-aside.component.html',
  styleUrls: ['./menu-aside.component.css']
})

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class MenuAsideComponent implements OnInit {
  
  /**
  * Contiene el objeto con los datos del usuario.
  * @type {any}
  */
  usuario: any = {}

  /**
  * Contiene el array del menu
  * a mostrar.
  * @type {any}
  */
  menu: any[] = [];

  /**
  * Contiene del toggle
  * @type {boolean}
  */
  toggle: boolean = false;
  
  /**
  * Contiene la imagen de fondo
  * a mostrar
  * @type {boolean}
  */
  fondo;

  /**
  * Contiene el elemento cuando se abre
  * el menu.
  * @type {Array}
  */
  openmenu = [];

  /**
  * Contiene la ruta de la API
  * del archivo environment
  * @type {any}
  */
  private API_PATH = environment.API_PATH;
  
  /**
  * Muestra el manu actual.
  * @type {any}
  */
  menuactual: string;

  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private router: Router, private authService: AuthService, ) { }

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  
    var menu = JSON.parse(localStorage.getItem("menu"));

    this.fondo = '../assets/iconos/aside.jpg';

    var url = location.href.split("/");
    this.menuactual = " " + url[4];
    this.menuactual = this.menuactual.toLowerCase()
      .replace(/[-_]+/g, ' ')
      .replace(/[^\w\s]/g, '')
      .replace(/ (.)/g, function ($1) { return $1.toUpperCase(); })
      .replace(/ /g, '');

    for (let item of menu) {
      if (item.titulo == this.menuactual || item.path.indexOf(url[4]) > -1) {
        if (this.menu.indexOf(item) < 0)
          this.menu.push(item);
      }
    }
  }
  
  /**
  * Este método realizar 
  * el cierre de sesion.
  * @return void
  */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}