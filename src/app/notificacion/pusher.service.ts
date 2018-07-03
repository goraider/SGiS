/**
* <h1>Pusher Service</h1>
*<p>
* El servicio crud se encarga de conectar las funciones
* y parametros de la API oficial de https://pusher.com/
* </p>
*
* @author  Eliecer Ramirez Esquinca
* @version 2.0
* @since   2018-04-30 
*/

/**
* Contiene los datos que conectan a la API  de Pusher
* para cargar las notificaciones.
* @type {any}
*/
declare var Pusher: any;

import { Injectable, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from "rxjs/Rx";
import {List} from 'immutable';

import { environment } from '../../environments/environment';

@Injectable()
export class PusherService {

    /**
    * Contiene los datos del usuario del LocalStorage.
    * @type {object}
    */
    public usuario = JSON.parse(localStorage.getItem("usuario"));

    /**
    * Contiene los datos e instancia de la url
    * donde encuantran los parametros de conexion con la API.
    * @type {any}
    */
    private pusher: any;

    /**
    * Contiene el array donde guarda el canal
    * donde se conecta la API.
    * @type {any}
    */
    private channels: any[];
    
    /**
    * Contiene el listado de los mensajes en
    * una lista.
    * @type {BehaviorSubject}
    */
    private _messages: BehaviorSubject<List<string>> = new BehaviorSubject(List([]));
    
    /**
    * Contiene los mensajes
    * en un observable para ver si se generaron
    * mensajes nuevos.
    * @type {Observable}
    */
    public messages: Observable<List<string>> = this._messages.asObservable();
    
    /**
    * Este método inicializa la carga de las dependencias 
    * que se necesitan para el funcionamiento del modulo
    * que conectan con la API de pusher y el archivo Environments
    */
    constructor() {
        this.pusher = new Pusher(`${environment.pusher_key}`, {
            cluster: `${environment.pusher_cluster}`,
            encrypted: true
        });
        this.pusher.logToConsole = true;
        this.channels = [];

        var channel = this.pusher.subscribe(`${environment.pusher_channel}${this.usuario.id}`);

        channel.bind(`${environment.pusher_event}`,  (data) => {
            this._messages.next(data);

            console.log(this._messages.next(data));

        }); 
    }
}