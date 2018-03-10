import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core/src/metadata/directives';




@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class GraficaDonaComponent implements OnInit {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    datos: any[] = [];

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartColors:{}[] = [{backgroundColor: ["#669933", "#ffcc33", "#cc3300"]}];
    public doughnutChartType:string = 'doughnut';
  
    public color:  any;
    public totales: any;
    public totalIncidencias: any = '';
    public nombreColor: any[] = [];
    public numeroColor: number[] = [];

    cargando: boolean = false;
    
    constructor(private title: Title, private crudService: CrudService) {
      this.doughnutChartLabels.length = 0;
      this.doughnutChartData.length = 0;
      
    }

    ngOnInit() {

      this.listar('dashboard');
     
    }

    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => {
              this.cargando = false;
  
              //console.log("resultado");
              this.datos = resultado as any[];
              //this.datos.push(...resultado);
  
              
             //console.log("datos grafica dona",this.datos);
  
  
              this.datos[1].triage.forEach(dete => {
                this.color = dete.nombre;             
                this.totales = dete.total;

                //console.log(dete);

                this.doughnutChartLabels.push(this.color);
                this.doughnutChartData.push(this.totales);

                this.totalIncidencias = this.datos[0].totalTriage;

                this.nombreColor.push(dete);
                //this.numeroColor.push(dete.total);

            });
            

            

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

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
    
    public chartHovered(e:any):void {
      console.log(e);
    }
  
}