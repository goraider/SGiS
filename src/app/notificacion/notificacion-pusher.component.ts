/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { PusherService } from './pusher.service'

import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../environments/environment';
import { CrudService } from '../crud/crud.service';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
    selector: 'notificacion-pusher',
    templateUrl: './notificacion-pusher.component.html',
    providers: [PusherService]
})

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class NotificacionPusherComponent {

    /**
    * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
    * @type {any}
    */
    tamano = document.body.clientHeight;

    /**
    * Contiene el array de los mensajes.
    * @type {any}
    */
    mensajes:any = [];

    /**
    * Contador para incrementar
    * el numero de notificaciones
    * @type {number}
    */
    numero_notif = 0;

    /**
    * almacena el total de
    * notificaciones
    * @type {number}
    */
    total = 0;
    
    /**
    * almacena una bandera para mostrar
    * las notificaciones
    * @type {boolean}
    */
    mostrar_notificacion = false;
    
    /**
    * Contiene la ruta del
    * environment
    * @type {boolean}
    */
    API_PATH = environment.API_PATH;
    
    /**
    * Opciones de la pocision del mensaje al cargar la lista, Opcional.
    * @type {object}
    */
    public options = {
        position: ["bottom", "left"],
        timeOut: 3000,
        lastOnBottom: true
    };

    /**
    * Ruta de la notificacion
    * @type {any}
    */
    ruta_notificacion="";
    
    /**
    * Este método inicializa la carga de las dependencias 
    * que se necesitan para el funcionamiento del catalogo
    */
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
    
    /**
    * Este método obtiene una lista de elementos de la api
    * de la ruta notificacion.
    * @return void
    */
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

    /**
    * Método para mostrar o no las notificaciones.
    * @return void
    */
    toggleNotificaciones(){
        this.mostrar_notificacion = !this.mostrar_notificacion;
    }

    /**
    * Método para listar Unidades Medicas en el Autocomplet
    * @param modelo contiene los datos del modelo a enviar
    * @param id contiene id del mensaje a enviar.
    * @param i contiene el indice para marcar si esta o no leido para
    * mostrarlo en la vista.
    */
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