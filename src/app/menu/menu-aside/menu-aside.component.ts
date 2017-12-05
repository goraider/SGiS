import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'sistema-menu-aside',
  templateUrl: './menu-aside.component.html',
  styleUrls: ['./menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {

  usuario: any = {}
  menu: any[] = [];
  toggle: boolean = false;
  fondo;
  openmenu = [];
  private API_PATH = environment.API_PATH;

  menuactual: string;
  tamano = document.body.clientHeight;
  constructor(private router: Router, private authService: AuthService, ) { }


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
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}