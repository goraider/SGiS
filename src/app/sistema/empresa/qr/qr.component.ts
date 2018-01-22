import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'qr-clues',
  templateUrl: './qr.component.html'
})

export class QrComponent {
  tamano;
  dato: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tamano = document.body.clientHeight;
    this.dato = this.fb.group({
      id: [''],
      qr: ['']
    });  
  }  
}