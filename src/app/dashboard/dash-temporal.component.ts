import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dash-temporal',
  templateUrl: './dash-temporal.component.html'
})
export class CambiarCluesComponent implements OnInit {



  constructor(
                private ruta: Router
            ) {}

  ngOnInit() {

    this.ruta.navigate(['/dashboard']);

  }


}
