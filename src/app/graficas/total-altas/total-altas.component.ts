import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';
import { Observable } from 'rxjs';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { observeOn } from 'rxjs/operator/observeOn';
import { EventEmitter } from 'selenium-webdriver';




@Component({
  selector: 'app-total-altas',
  templateUrl: './total-altas.component.html',
  styleUrls: ['./total-altas.component.css']
})
export class TotalAltasComponent implements OnInit {

    cargando:boolean = false;

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    datos: any[] = [];

    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartColors:{}[] = [{backgroundColor: ['rgb(56, 190, 56, 0.9)', 'rgb(1, 116, 223, 0.9)', 'rgb(5, 4, 9, 0.9)']}];
    public pieChartType:string = 'pie';  
    public nombreColor: any[] = [];
    public nombre:  any;
    public total: any;
    public totalAltas: any = '';

    
    
    constructor(private title: Title, private crudService: CrudService) {
      this.pieChartLabels.length = 0;
      this.pieChartData.length = 0;

      
      
    }

    ngOnInit() {
      
      this.listar('dashboard');
      // this.salaEspera().subscribe();
      // this.obtenerIncidencias();
      
     
    }

    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => {
               
              //console.log("resultado");
              this.datos = resultado as any[];
              //this.datos.push(...resultado);
  
              
              //console.log("datos grafica pastel",this.datos);
  
  
              this.datos[4].altas.forEach(dete => {
                this.nombre = dete.nombre;             
                this.total = dete.total;

                this.pieChartLabels.push(this.nombre);
                this.pieChartData.push(this.total);

                this.totalAltas = this.datos[3].totalAltas;

                this.nombreColor.push(dete);

            });

                this.cargando = false;

              setTimeout(() => {
                if (this.chart && this.chart.chart && this.chart.chart.config) {
                  
                  this.chart.chart.update();
                }
              });
  

  
              
  
          },
          error => {
  
          }
      );
    }

    // salaEspera(): Observable<any> {

    //     return new Observable(observer=>{

    //       let contador = 0;

    //       let intervalo = setInterval( () => {

    //         contador += 1;


    //           observer.next(contador);




    //       }, 1000);



    //     });
        
    // }

    // obtenerIncidencias(){

    //   let incidencias = this.crudService.lista_general('incidencias').subscribe(
    //     resultado => {

    //       console.log(resultado);
    //       resultado.map((detalle) =>{
    //         console.log('...detalle', detalle.id);
    //       });
    //     },
        
    //     error => {

    //     });

    //     return incidencias;

    // }
  
}