import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private usuario: any = {}

  constructor(private title: Title) { }

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
