import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { CrudService } from '../crud/crud.service';
import { forEach } from '@angular/router/src/utils/collection';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core/src/metadata/directives';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  usuario: any = {}
  datos: any[] = [];
  menu;

  Triage: any = '';
  Altas: any = '';

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartColors:{}[] = [{backgroundColor: ["#009933", "#e6e600", "#e84351"]}];
  public doughnutChartType:string = 'doughnut';

  public color:  any;
  public totales: any;

  public pieChartLabels:string[] = ['Mejoria', 'Voluntaria', 'Defunsion'];
  public pieChartData:number[] = [226, 8, 0];
  public pieChartColors:{}[] = [{backgroundColor: ["#009933", "#e6e600", "#e84351"]}];
  public pieChartType:string = 'pie';

  public nombre:  any;
  public total: any;

  cargando: boolean = false;

  constructor(private title: Title, private crudService: CrudService,) {
    
    this.doughnutChartLabels.length = 0;
    this.doughnutChartData.length = 0;
  
    
 

  }

  ngOnInit() {

    this.title.setTitle("Dashboard");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    var clues = localStorage.getItem("clues");

    var abrir = false;
    if(clues == '')
      abrir = true;

    if(abrir)
      document.getElementById("cambiar_clues").click();

      this.listar('dashboard');
    
  }




  listar(url) {
    
    this.cargando = true;
    this.crudService.lista_general(url).subscribe(
        resultado => {
            this.cargando = false;

            //console.log("resultado");
            //this.datos = resultado as any[];
            this.datos.push(...resultado);

            
            console.log("datos",this.datos);

            this.Triage = this.datos[0].totalTriage;
            this.Altas = this.datos[2].totalAltas;

            this.datos[1].triage.forEach(element => {
                


                this.color = element.nombre;
                this.totales = element.total;

                this.doughnutChartLabels.push(this.color);
                this.doughnutChartData.push(this.totales);
                

            });

          //   this.datos[3].altas.forEach(dete => {
                


          //     this.nombre = dete.nombre;
          //     this.total = dete.total;


              

          // });

            setTimeout(() => {
              if (this.chart && this.chart.chart && this.chart.chart.config) {
                console.log(this.chart);
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
