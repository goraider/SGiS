import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'reporte-lista',
  templateUrl: './lista.component.html'
})

export class ReporteVentaComponent{
  dato: FormGroup;
  constructor(private fb: FormBuilder) { }
  tamano = document.body.clientHeight;
  private rangos_fecha;
  ngOnInit(){
    document.getElementById("catalogos").click();

    this.dato = this.fb.group({    
      rango_fecha: [''],
      tipo_rango: [''],
      fecha_inicial: [''],
      fecha_final: ['']  
    }); 

    this.rangos_fecha = [
      {'id': moment().format('YYYY-MM-DD')+'/'+moment().format('YYYY-MM-DD'), 'nombre':'Hoy'},
      {'id': moment().subtract(1, 'days').format('YYYY-MM-DD')+'/'+moment().subtract(1, 'days').format('YYYY-MM-DD'), 'nombre': 'Ayer'},
      {'id': moment().subtract(7, 'days').format('YYYY-MM-DD')+'/'+moment().format('YYYY-MM-DD'), 'nombre': 'Últimos 7 días'},
      {'id': moment().startOf('month').format('YYYY-MM-DD')+'/'+moment().endOf('month').format('YYYY-MM-DD'), 'nombre': 'Este mes'},
      {'id': moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD')+'/'+moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'), 'nombre': 'Mes pasado'},
      {'id': moment().startOf('year').format('YYYY-MM-DD')+'/'+moment().endOf('year').format('YYYY-MM-DD'), 'nombre': 'Este año'},
      {'id': moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD')+'/'+moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'), 'nombre': 'Año pasado'},
      {'id': moment('1969-01-01', 'YYYY-MM-DD', true).format('YYYY-MM-DD')+'/'+moment().format('YYYY-MM-DD'), 'nombre': 'Todos los tiempos'}
    ];
  }

  imprimir() {
    /*let pdf = new jsPDF('p', 'pt', 'letter');
    pdf.setProperties({
      title: 'Ticket',
      subject: 'YOURSOFT',
      author: 'Eliecer Ramirez Esquinca',
      keywords: 'yoursoft, web, mobile, desarrollo, agil',
      creator: 'www.yoursoft.com.mx'
    });
    var elementHandler = {
      '.equis': function (element, renderer) {
        return true;
      }
    };
    pdf.fromHTML($('body')[0], 5, 5, {
      'width': 170,
      'elementHandlers': elementHandler
    });

    pdf.output('dataurlnewwindow')*/
    var html = document.getElementById("imprimir").innerHTML;
    html = '<html lang="es">' + ' <head>' + ' <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' + ' <meta name="charset" content="UTF-8">' + ' <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">' + ' <meta name="apple-mobile-web-app-capable" content="yes">' + ' <title>PDF</title> <meta name="viewport" content="initial-scale=1" />' + ' <style>html { font-size: .9em;} body{font-size: .9em;} select::-ms-expand {display: none;}</style>' + ' </head>' + ' <body>' + html + ' </body>' + ' </html>';
    var iframe = document.createElement('iframe');
    iframe.setAttribute("id", "printf");
    iframe.setAttribute("style", "display:none");
    document.body.appendChild(iframe);

    var mywindow = <HTMLSelectElement>document.getElementById('printf');
    mywindow.contentWindow.document.write(html);
    setTimeout(function () {
      // lanzar la sentencia imprimir
      mywindow.contentWindow.print();
    }, 500);
    setTimeout(function () {
      // remover el contenedor de impresión
      document.body.removeChild(iframe);
    }, 2000);
  }
}