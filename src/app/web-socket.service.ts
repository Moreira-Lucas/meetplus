import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
events = ['new-user','bye-user'];
cbEvent:EventEmitter<any> = new EventEmitter<any>();  

constructor(private socket:Socket) {
    this.listener();
   }

    listener = () =>{
    this.events.forEach(eventName => {
      this.socket.on(eventName, data => this.cbEvent.emit({
        name:eventName,
        data
      }))
    });
  };

  joinRoom = (data) =>{
    this.socket.emit('join',data);
  }
}
