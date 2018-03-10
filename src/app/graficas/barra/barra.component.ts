import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core/src/metadata/directives';




@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class GraficaBarraComponent implements OnInit {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    datos: any[] = [];

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartColors:{}[] = [{backgroundColor: ["#669933", "#ffcc33", "#cc3300"]}];
    public doughnutChartType:string = 'doughnut';

    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
   
    public barChartData:any[] = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
  
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

      //this.listar('dashboard');
     
    }

    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => {
              this.cargando = false;
  
            //   //console.log("resultado");
            //   this.datos = resultado as any[];
            //   //this.datos.push(...resultado);
  
              
            //   console.log("datos grafica barra",this.datos);
  
  
            //   this.datos[1].triage.forEach(dete => {
            //     this.color = dete.nombre;             
            //     this.totales = dete.total;

            //     console.log(dete);

            //     this.doughnutChartLabels.push(this.color);
            //     this.doughnutChartData.push(this.totales);

            //     this.totalIncidencias = this.datos[0].totalTriage;

            //     this.nombreColor.push(dete);
            //     //this.numeroColor.push(dete.total);

            // });
            

            

            //   setTimeout(() => {
            //     if (this.chart && this.chart.chart && this.chart.chart.config) {
                  
            //       this.chart.chart.update();
            //     }
            //   });
  

  
              
  
          },
          error => {
  
          }
      );
    }

    public randomize():void {
      // Only Change 3 values
      let data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
      /**
       * (My guess), for Angular to recognize the change in the dataset
       * it has to change the dataset variable directly,
       * so one way around it, is to clone the data, change it and then
       * assign it;
       */
    }

  // events
    public chartClicked(e:any):void {
      console.log(e);
    }
  
    public chartHovered(e:any):void {
      console.log(e);
    }
  
}