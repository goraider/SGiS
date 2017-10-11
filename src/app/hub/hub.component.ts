import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  private mostrar: boolean = false;
  menu:any[] = [];
  constructor() { }

  ngOnInit() {
    this.menu = JSON.parse(localStorage.getItem("menu"));
  }

  toggle() {
    this.mostrar = !this.mostrar;
  }

}
