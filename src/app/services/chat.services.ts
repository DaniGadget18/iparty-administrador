import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class ChatService {

  url: string = "http://localhost:3000"
  socket;
  constructor() {

  }

  setupSocketConnection(  ) {
    this.socket = io("http://localhost:3000");
  }

  public sendMessage(room, message) {
    this.socket.emit('message',  ({room, message}) );
  }

  public getMessages() {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }

  public joinRoom(room) {
     this.socket.emit('join', room);
  }

  public leaveRoom(room) {
    this.socket.emit('leave_room', room);
  }

  public getSala() {
    return Observable.create((observer) => {
      this.socket.on('nueva-sala', (sala) => {
        observer.next(sala);
      });
    });
  }


}
