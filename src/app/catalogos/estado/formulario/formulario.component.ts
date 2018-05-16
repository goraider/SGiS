import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'tipo-medio-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {

  /**
  * Contiene los datos del formulario que comunican a la vista con el componente.
  * @type {string}
  */
  dato: FormGroup;
  /**
  * Contiene valor temporal del id del pais asociado.
  * @type {string}
  */
  temp_paises_id;
  /**
  * Contiene el id del pais asociado.
  * @type {any}
  */
  paises_id;
  /**
   * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
   * @type {string}
   */
  tamano = document.body.clientHeight;

   /**
   * Este método inicializa la carga de las dependencias 
   * que se necesitan para el funcionamiento del catalogo
   */
  constructor(private fb: FormBuilder) {}

   /**
   * Este método inicializa la carga de la vista asociada junto los datos del formulario
   * @return void
   */

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''], 
      clave: ['', [Validators.required]],     
      nombre: ['', [Validators.required]],
      paises_id: ['', [Validators.required]]    
    });  
    
   /**
   * Este método recorre el valor del pais con relacion al estado
   * @return void
   */

    var ip = 0, ie = 0, im = 0;
    this.dato.controls.paises_id.valueChanges.
      subscribe(val => {
        if(val && ip == 0){
          ip++;
          this.temp_paises_id = val;
        }
    });
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();    
  }
   /**
   * Este carga el id del pais para generar su autovalor cuando se edite.
   * @return void
   */
  autovalor_pais(){
    setTimeout(() => {
      this.paises_id = this.temp_paises_id;
    }, 2000);
  }
  
}