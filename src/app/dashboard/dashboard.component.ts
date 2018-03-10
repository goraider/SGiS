import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { CrudService } from '../crud/crud.service';
import { forEach } from '@angular/router/src/utils/collection';

import { Input } from '@angular/core/src/metadata/directives';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: any = {}
  datos: any[] = [];
  public menu;
  tab: number = 1;

  constructor(private title: Title, private crudService: CrudService,) {}

  ngOnInit() {

    this.title.setTitle("Dashboard");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    var clues = localStorage.getItem("clues");

    var abrir = false;
    if(clues == '')
      abrir = true;

    if(abrir)
      document.getElementById("cambiar_clues").click();

    
  }

}
