import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginacion',
  templateUrl: './paginacion.component.html'
})
export class PaginacionComponent implements OnInit {
  @Input() ctrl: any;
  constructor() { }

  ngOnInit() {
  }
}
