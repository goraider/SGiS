import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListarComponent } from '../../../crud/listar.component';
import { CrudService } from '../../../crud/crud.service';

import * as jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';

import * as moment from 'moment';

import * as pdfmake from 'pdfmake/build/pdfmake.js';
import * as pdffonts from 'pdfmake/build/vfs_fonts.js';
import { forEach } from '@angular/router/src/utils/collection';
import { concat } from 'rxjs/operators/concat';



@Component({
  selector: 'incidencias-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent {
    @Input() ctrl: any; 

    tamano = document.body.clientHeight;
  
    private url_nuevo: string = '';
    private permisos = JSON.parse(localStorage.getItem("permisos"));
    private carpeta;
    private modulo;
    private controlador;
    private modulo_actual;
    private icono;

  

  constructor(public crudService: CrudService){ }

  clues = JSON.parse(localStorage.getItem("clues"));

  ngOnInit() {

    var url = location.href.split("/");
    this.carpeta = url[4];
    this.modulo = url[5];
    //this.modulo_actual = this.modulo.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/[-_]+/g, ' ');

    var ctrl = "-" + this.modulo;
    this.controlador = ctrl.toLowerCase()
        // remplazar _ o - por espacios
        .replace(/[-_]+/g, ' ')
        // quitar numeros
        .replace(/[^\w\s]/g, '')
        // cambiar a mayusculas el primer caracter despues de un espacio
        .replace(/ (.)/g, function($1) {
            return $1.toUpperCase(); })
        // quitar espacios y agregar controller
        .replace(/ /g, '') + "Controller";
    
    this.url_nuevo = '/' + this.carpeta + '/' + this.modulo + '/nuevo';
    var titulo_icono = this.obtener_icono(url[5] + '/' + url[6], JSON.parse(localStorage.getItem("menu")));
    this.permisos;
    this.icono = titulo_icono.icono;
    this.modulo_actual = titulo_icono.titulo;

  }

  obtener_icono(controlador, menu) {
    menu.map((element, key) => {
      if (typeof this.icono == 'undefined') {
        if (element.lista) {
          this.icono = this.obtener_icono(controlador, element.lista);
          return this.icono;
        }
        if (element.path.indexOf(controlador) > -1) {
          this.icono = element;
          return this.icono;
        }
      }
      else
        return this.icono;
    });
    return this.icono;
  }  
  
  
  cambiar_busqueda(){
    setTimeout(() => {
      document.getElementById("rebuscar").click();
    }, 100);
  }

    download(e, id) {

        this.crudService.ver(id, "incidencias").subscribe(
          resultado => {

            console.log(resultado.data);

          var columns_paciente = [
              {title: "Nombre", dataKey: "nombre_paciente"},
              {title: "CURP", dataKey: "curp_paciente"},
              {title: "Teléfono", dataKey: "telefono_paciente"},
              {title: "Fecha de Nacimiento", dataKey: "fecha_nacimiento_paciente"},
              
          ];

          var rows_pacientes = [];
              rows_pacientes.push({
                "nombre_paciente": resultado.data.pacientes[0].personas.nombre+" "+resultado.data.pacientes[0].personas.paterno+" "+resultado.data.pacientes[0].personas.materno,
                "curp_paciente": resultado.data.pacientes[0].personas.id,
                "telefono_paciente": resultado.data.pacientes[0].personas.telefono,
                "fecha_nacimiento_paciente": resultado.data.pacientes[0].personas.fecha_nacimiento,
               });

          
            if(resultado.data.pacientes[0].acompaniantes[0]){
                if(resultado.data.pacientes[0].acompaniantes[0].personas.fecha_nacimiento == null){
                  resultado.data.pacientes[0].acompaniantes[0].personas.fecha_nacimiento = "N/A";
                var columns_acompaniante = [
                    {title: "Nombre", dataKey: "nombre_acompaniante"},
                    {title: "CURP", dataKey: "curp_acompaniante"},
                    {title: "Teléfono", dataKey: "telefono_acompaniante"},
                    {title: "Fecha de Nacimiento", dataKey: "fecha_nacimiento_acompaniante"},
                ];
        
                var rows_acompaniante = []; 
                    rows_acompaniante.push({
                        "nombre_acompaniante": resultado.data.pacientes[0].acompaniantes[0].personas.nombre+" "+resultado.data.pacientes[0].acompaniantes[0].personas.paterno+" "+resultado.data.pacientes[0].acompaniantes[0].personas.materno,
                        "curp_acompaniante": resultado.data.pacientes[0].acompaniantes[0].personas.id,
                        "telefono_acompaniante": resultado.data.pacientes[0].acompaniantes[0].personas.telefono,
                        "fecha_nacimiento_acompaniante": resultado.data.pacientes[0].acompaniantes[0].personas.fecha_nacimiento,
                });
              }
            }




            if(resultado.data.pacientes[0].acompaniantes[1]){
              if(resultado.data.pacientes[0].acompaniantes[0].personas.fecha_nacimiento == null){
                var columns_responsable = [
                {title: "Nombre", dataKey: "nombre_acompaniante"},
                {title: "CURP", dataKey: "curp_acompaniante"},
                {title: "Teléfono", dataKey: "telefono_acompaniante"},
                {title: "Fecha de Nacimiento", dataKey: "fecha_nacimiento_acompaniante"},
            ];
              
              var rows_responsable = []; 
                rows_responsable.push({
                  "nombre_acompaniante": resultado.data.pacientes[0].acompaniantes[1].personas.nombre+" "+resultado.data.pacientes[0].acompaniantes[1].personas.paterno+" "+resultado.data.pacientes[0].acompaniantes[1].personas.materno,
                  "curp_acompaniante": resultado.data.pacientes[0].acompaniantes[1].personas.id,
                  "telefono_acompaniante": resultado.data.pacientes[0].acompaniantes[1].personas.telefono,
                  "fecha_nacimiento_acompaniante": resultado.data.pacientes[0].acompaniantes[1].personas.fecha_nacimiento,
                });
              }
            }

          
          if(resultado.data.movimientos_incidencias.length >= 0){

            var num = resultado.data.movimientos_incidencias.length;

            var columns_movimientos = [
              {title: "N°", dataKey: "numero"},
              {title: "Antigüedad", dataKey: "antiguedad_paciente"},
              {title: "Estado", dataKey: "estado_paciente_movimiento"},
              {title: "Triage", dataKey: "triage_acompaniante_movimiento"},
              {title: "Ubicación", dataKey: "ubicacion_paciente_movimiento"},
              {title: "CIE-10", dataKey: "cie10_movimientos"},
              
            ];
            
            var rows_movimientos = []; 
            resultado.data.movimientos_incidencias.forEach(element => {

              // if(element.reporte_medico == null){
              //   var indi = "EN INGRESO Y ATENCIÓN";
                
              //   element.indicaciones = indi
                
              // }

              if(element != '' || element != null || element != undefined){
                rows_movimientos.push({
                  "numero": num --,
                  "antiguedad_paciente": element.antiguedad,
                  "estado_paciente_movimiento": element.estados_pacientes.nombre,
                  "triage_acompaniante_movimiento": element.triage_colores.nombre,
                  "ubicacion_paciente_movimiento": element.ubicaciones_pacientes.nombre,
                  "cie10_movimientos": element.subcategorias_cie10.nombre,
                });;
              }
              console.log(element);
            });

            

          }
            
          


    

              

             var logoSalud = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4RDuRXhpZgAATU0AKgAAAAgABAE7AAIAAAAMAAAISodpAAQAAAABAAAIVpydAAEAAAAYAAAQzuocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGluZm9ybWF0aWNhAAAFkAMAAgAAABQAABCkkAQAAgAAABQAABC4kpEAAgAAAAMwNQAAkpIAAgAAAAMwNQAA6hwABwAACAwAAAiYAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAxNjowODoyNCAxNDo1NjowMAAyMDE2OjA4OjI0IDE0OjU2OjAwAAAAaQBuAGYAbwByAG0AYQB0AGkAYwBhAAAA/+ELHmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdGVEYXRlPjIwMTYtMDgtMjRUMTQ6NTY6MDAuMDUwPC94bXA6Q3JlYXRlRGF0ZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPmluZm9ybWF0aWNhPC9yZGY6bGk+PC9yZGY6U2VxPg0KCQkJPC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0n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'




            let jsPDF = require('jspdf');
            require('jspdf-autotable');

             let pdf = new jsPDF('l');

             var totalPagesExpPaciente = "{total_pages_count_string}";


             var pageContentPaciente = function (data) {
              // HEADER
              pdf.setFontSize(20);
              pdf.setTextColor(40);
              pdf.setFontStyle('normal');
              if (logoSalud) {
                  pdf.addImage(logoSalud, 'JPEG', 100, 5, 190, 20);

                  
              }
              
              pdf.text("Incidencia por Paciente", data.settings.margin.left + 4, 15);
              pdf.setFontSize(8)
              pdf.setFont('helvetica')
              pdf.text("Sistema para la Gestión de Incidencias en Salud (SGiS)", data.settings.margin.left + 4, 19);
        
              // FOOTER
              var str = "Pagina " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExpPaciente;
              }
              pdf.setFontSize(10);
              pdf.setFontType("italic");
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
          };


             pdf.setFontSize(13)
             pdf.setFont('helvetica')
             pdf.setFontType('bold')
             pdf.text(10, 45, 'Datos de la Paciente:');
             pdf.text(60, 45, 'Folio de Incidencia:');
             pdf.setFontType('normal')
             pdf.text(105, 45, resultado.data.id)

             pdf.autoTable(columns_paciente, rows_pacientes, {
              
                startY: 50,
                margin: {top: 30, horizontal: 7},
                styles: {fontSize: 13,overflow: 'linebreak', columnWidth: 'wrap'},
                columnStyles: {text: {columnWidth: 'auto'}},
                addPageContent: pageContentPaciente
                       
              });


            if(resultado.data.pacientes[0].acompaniantes[0]){
                  pdf.setFontSize(13)
                  pdf.setFont('helvetica')
                  pdf.setFontType('bold')
                  pdf.text(10, 90, 'Datos del Acompañante:');
    
                  pdf.autoTable(columns_acompaniante, rows_acompaniante, {
                    
                      startY: pdf.autoTable.previous.finalY + 25,
                      margin: {top: 30, horizontal: 7},
                      styles: {fontSize: 13,overflow: 'linebreak', columnWidth: 'wrap'},
                      columnStyles: {text: {columnWidth: 'auto'}},
                      addPageContent: pageContentPaciente
                             
                  });
            }

              if(resultado.data.pacientes[0].acompaniantes[1]){
                    pdf.setFontSize(13)
                    pdf.setFont('helvetica')
                    pdf.setFontType('bold')
                    pdf.text(10, 132, 'Datos del Responsable:');
      
                    pdf.autoTable(columns_responsable, rows_responsable, {
                      
                        startY: pdf.autoTable.previous.finalY + 25,
                        margin: {horizontal: 7},
                        bodyStyles: {valign: 'top'},
                        styles: {fontSize: 13,overflow: 'linebreak', columnWidth: 'wrap'},
                        columnStyles: {text: {columnWidth: 'auto'}},
                        addPageContent: pageContentPaciente
                               
                    });
              }

              if (typeof pdf.putTotalPages === 'function') {
                pdf.putTotalPages(totalPagesExpPaciente);
              }

              pdf.addPage();
              
              var totalPagesExpMovimientos = "{total_pages_count_string}";
              var pageContentMovimientos = function (data) {
                // HEADER
                pdf.setFontSize(20);
                pdf.setTextColor(40);
                pdf.setFontStyle('normal');
                if (logoSalud) {
                    pdf.addImage(logoSalud, 'JPEG', 100, 5, 190, 20);
  
                    
                }
                
                pdf.text("Incidencia por Paciente", data.settings.margin.left + 4, 15);
                pdf.setFontSize(8)
                pdf.setFont('helvetica')
                pdf.text("Sistema para la Gestión de Incidencias en Salud (SGiS)", data.settings.margin.left + 4, 19);
          
                // FOOTER
                var str = "Pagina " + data.pageCount;
                // Total page number plugin only available in jspdf v1.0+
                if (typeof pdf.putTotalPages === 'function') {
                    str = str + " de " + totalPagesExpMovimientos;
                }
                pdf.setFontSize(10);
                pdf.setFontType("italic");
                pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
            };

              pdf.setFontSize(13)
              pdf.setFont('helvetica')
              pdf.setFontType('bold')
              pdf.text(10, 35, 'Seguimiento de la Paciente:');
              pdf.setFontType('normal')              
              pdf.text(75, 35,  resultado.data.pacientes[0].personas.nombre+" "+resultado.data.pacientes[0].personas.paterno+" "+resultado.data.pacientes[0].personas.materno);
              
              var data = rows_movimientos;
              pdf.autoTable(columns_movimientos, data, {

                startY: 45,
                margin: {horizontal: 7},
                bodyStyles: {valign: 'top'},
                styles: {fontSize: 12,overflow: 'linebreak', columnWidth: 'wrap'},
                columnStyles: {text: {columnWidth: 'auto'}},
                addPageContent: pageContentMovimientos



              });



              if (typeof pdf.putTotalPages === 'function') {
                pdf.putTotalPages(totalPagesExpMovimientos);
              }




            //  pdf.addImage(logoUgus, 'JPEG', 10, 5, 30, 30);
            //  pdf.addImage(logoSalud, 'JPEG', 150, 8, 50, 15);



             
            //  pdf.setFontSize(15)
            //  pdf.setFont('times')
            //  pdf.setFontType('bold')
            //  pdf.text(20, 45, 'Datos del Paciente:');


            
             


            //  pdf.setFontSize(12)
            //  pdf.setFont('times')
            //  pdf.setFontType('bold')
            //  pdf.text(20, 110, 'Nombre:');
            //  pdf.setFontType('normal')
            //  pdf.text(40, 110, element.acompaniantes[0].personas.nombre+" "+element.acompaniantes[0].personas.paterno+" "+element.acompaniantes[0].personas.materno);

            //  pdf.setFontSize(12)
            //  pdf.setFont('times')
            //  pdf.setFontType('bold')
            //  pdf.text(120, 110, 'Telefono:');
            //  pdf.setFontType('normal')
            //  pdf.text(160, 110, element.acompaniantes[0].personas.telefono);

            //  pdf.setFontSize(12)
            //  pdf.setFont('times')
            //  pdf.setFontType('bold')
            //  pdf.text(20, 120, 'Dirección:');
            //  pdf.setFontType('normal')
            //  pdf.text(40, 120, element.acompaniantes[0].personas.domicilio);


            //  if(element.acompaniantes[1]){

            //       pdf.setFontSize(15)
            //       pdf.setFont('times')
            //       pdf.setFontType('bold')
            //       pdf.text(20, 135, 'Datos del Responsable:');

            //       pdf.setFontSize(12)
            //       pdf.setFont('times')
            //       pdf.setFontType('bold')
            //       pdf.text(20, 150, 'Nombre:');
            //       pdf.setFontType('normal')
            //       pdf.text(40, 150, element.acompaniantes[1].personas.nombre+" "+element.acompaniantes[1].personas.paterno+" "+element.acompaniantes[1].personas.materno);
     
            //       pdf.setFontSize(12)
            //       pdf.setFont('times')
            //       pdf.setFontType('bold')
            //       pdf.text(120, 150, 'Telefono:');
            //       pdf.setFontType('normal')
            //       pdf.text(160, 150, element.acompaniantes[1].personas.telefono);

            //       pdf.setFontSize(12)
            //       pdf.setFont('times')
            //       pdf.setFontType('bold')
            //       pdf.text(20, 160, 'Dirección:');
            //       pdf.setFontType('normal')
            //       pdf.text(40, 160, element.acompaniantes[1].personas.domicilio);

            //  }


            //  pdf.setFont('helvetica')
            //  pdf.setFontType('bold')
            //  pdf.text(70, 20, 'Reporte de Incidencia')
            
            //  pdf.setFontSize(8)
            //  pdf.setFont('helvetica')
            //  pdf.text(67, 24, 'Unidad de Gestion de Usuarios en Salud (UGUS)')



            // var i =  0;
            // resultado.data.movimientos_incidencias.forEach(seguimientos => {

              // pdf.setFontSize(12)
              // pdf.setFont('times')
              // pdf.setFontType('bold')
              // pdf.text(8, 55 + (i * 10), 'N°:');
              // pdf.setFontType('normal')
              // pdf.text(15, 55 + (i * 10), seguimientos.id);
    
    
            //   pdf.setFontSize(12)
            //   pdf.setFont('times')
            //   pdf.setFontType('bold')
            //   pdf.text(20, 55 + (i * 10), 'Fecha:');
            //   pdf.setFontType('normal')
            //   pdf.text(35, 55 + (i * 10), seguimientos.created_at);
    
    
            //   pdf.setFontSize(12)
            //   pdf.setFont('times')
            //   pdf.setFontType('bold')
            //   pdf.text(75, 55 + (i * 10), 'Turno:');
            //   pdf.setFontType('normal')
            //   pdf.text(90, 55 + (i * 10), seguimientos.turnos.nombre);
    
    
    
            //   pdf.setFontSize(12)
            //   pdf.setFont('times')
            //   pdf.setFontType('bold')
            //   pdf.text(115, 55 + (i * 10), 'Triage:');
            //   pdf.setFontType('normal')
            //   pdf.text(130, 55 + (i * 10), seguimientos.triage_colores.nombre);
    
    
            //   pdf.setFontSize(12)
            //   pdf.setFont('times')
            //   pdf.setFontType('bold')
            //   pdf.text(150, 55 + (i * 10), 'Valoración:');
            //   pdf.setFontType('normal')
            //   pdf.text(175, 55 + (i * 10), seguimientos.ubicaciones_pacientes.nombre);
              
            //     i++;
              
            // });
            

          



                        
            


          //   for(var i = 1; i < resultado.movimientos_incidencias; i ++) {
          //     pdf.text(20, 30 + (i * 10), i );
          // }


















            //  pdf.setFontSize(14)
            //  pdf.setFont('times')
            //  pdf.setFontType('bold')
            //  pdf.text(20, 100, 'Datos del Acompañante:');

            // pdf.setFontSize(15)
            // pdf.setFont('times')
            // pdf.setFontType('bold')
            // pdf.text(20, 150, 'Motivo del Ingreso:');
            // pdf.setFontType('normal')
            // pdf.text(65, 150, resultado.motivo_ingreso);


            // pdf.setFontSize(15)
            // pdf.setFont('times')
            // pdf.setFontType('bold')
            // pdf.text(20, 160, 'Impresión Diagnostica:');
            // pdf.setFontType('normal')
            // pdf.text(75, 160, resultado.impresion_diagnostica);


            // pdf.setFontSize(15)
            // pdf.setFont('times')
            // pdf.setFontType('bold')
            // pdf.text(20, 175, 'Seguimientos:');


            //  pdf.addPage();





             pdf.save('Incidencia N°:'+resultado.data.id+'.pdf');
        },
          error => {
         }
    
        );
    }

}
