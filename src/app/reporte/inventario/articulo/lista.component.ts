import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reporte-articulo',
  templateUrl: './lista.component.html'
})

export class ReporteArticuloComponent{
  tamano = document.body.clientHeight;
   filtro;
   orden;
  ngOnInit(){
    document.getElementById("catalogos").click();
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