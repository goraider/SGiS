import { Component, OnInit, ElementRef} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute, Params } from '@angular/router'
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'directorio-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  cargos_id;

public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: ['', [Validators.required]],
      id: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      celular: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      cargos_id: ['', [Validators.required]],
      clues: ['', [Validators.required]]
    });

    this.dato.controls.clues.valueChanges.subscribe(val => {
       (<HTMLInputElement>document.getElementById('directorio_clue')).value = this.dato.controls.clues.value;
     });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

  }

autocompleListFormatter = (data: any) => {

      let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);

}

valorFormato_clue_usuario(data: any)  {

      let html = `${data.nombre}`;
      return html;
}


}