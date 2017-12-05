import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  private usuario: any = JSON.parse(localStorage.getItem("usuario"));
  
  constructor() { }

  ngOnInit() {
    
  }

}
