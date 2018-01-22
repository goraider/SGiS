import { Component, OnInit } from '@angular/core';
import { PusherService } from './pusher.service'

import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../environments/environment';
import { CrudService } from '../crud/crud.service';

@Component({
    selector: 'notificacion-pusher',
    templateUrl: './notificacion-pusher.component.html',
    providers: [PusherService]
})
export class NotificacionPusherComponent {
    tamano = document.body.clientHeight;
    mensajes:any = [];
    numero_notif = 0;
    total = 0;
    mostrar_notificacion = false;

     API_PATH = environment.API_PATH;
    
    public options = {
        position: ["bottom", "left"],
        timeOut: 3000,
        lastOnBottom: true
    };;

    ruta_notificacion="";

    constructor(private pusher: PusherService, private notificacion: NotificationsService, private crudService: CrudService) {
        var url = location.href.split("/");
        for(let i = 0; i < url.length-4; i++){
            this.ruta_notificacion += "../";
        }
        this.ruta_notificacion += "notificacion/lista";
        
        this.lista_notificaciones();
        pusher.messages.subscribe(data => {
            
            if (data["mensaje"]) {
                this.mensajes.push(data);
                this.mensajes.reverse();
                this.numero_notif++;

                this.options = {
                    position: ["bottom", "right"],
                    timeOut: 5000,
                    lastOnBottom: true
                };

                var objeto = {
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    maxLength: data["mensaje"].mensaje.length
                };        
                this.notificacion.info(data["mensaje"].titulo, data["mensaje"].mensaje, objeto);
            }
        });
    }
    lista_notificaciones() {
        this.crudService.lista(1, 5, "notificacion").subscribe(
            resultado => {
                resultado.data.forEach(element => {                    
                    this.mensajes.push(element); 
                });
                this.total = resultado.total;
                this.numero_notif = resultado.total_n;

            },
            error => {
            }
        );
    }

    toggleNotificaciones(){
        this.mostrar_notificacion = !this.mostrar_notificacion;
    }

    leer_notificacion(id, i){
        let json:any = {id:id, leido:true};
        this.crudService.editar(id, json, "notificacion").subscribe(
            resultado => {  
                this.mensajes[i].mensaje.leido = true;                            
            },
            error => {                
            }
        );
    }
}