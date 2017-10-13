declare var Pusher: any;
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from "rxjs/Rx";
import {List} from 'immutable';

import { environment } from '../../environments/environment';

@Injectable()
export class PusherService {
    private pusher: any;
    private channels: any[];

    private _messages: BehaviorSubject<List<string>> = new BehaviorSubject(List([]));
    public messages: Observable<List<string>> = this._messages.asObservable();

    constructor() {
        this.pusher = new Pusher(`${environment.pusher_key}`, {
            cluster: `${environment.pusher_cluster}`,
            encrypted: true
        });
        this.pusher.logToConsole = true;
        this.channels = [];

        var channel = this.pusher.subscribe(`${environment.pusher_channel}`);
        channel.bind(`${environment.pusher_event}`,  (data) => {
            this._messages.next(data);

        }); 
    }
}