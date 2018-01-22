import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  usuario: any = JSON.parse(localStorage.getItem("usuario"));
  menuactual;
  activar;
  mostrarMenuAside: boolean = false;
  
  constructor() { }

  ngOnInit() {
    
  }
  toggleMenuAside() {
    this.mostrarMenuAside = !this.mostrarMenuAside;
  }

}
