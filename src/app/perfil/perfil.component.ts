import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from 'app/auth.service';
import { BloquearPantallaService }     from '../bloquear-pantalla/bloquear-pantalla.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  mostrar: boolean = false;
  usuario: any = {};
  
  constructor(
    private router: Router,
    private authService:AuthService,
    private bloquearPantallaService: BloquearPantallaService,
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }

  toggle() {
    this.mostrar = !this.mostrar;
    if(this.mostrar){
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
  }
  logout() {
    this.authService.logout();
     this.router.navigate(['/login']);
  }
  bloquear(){
   
    this.bloquearPantallaService.bloquearPantalla();
    this.mostrar = false;
  }
}
