import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ChatService {

  url: string = "http://localhost:3000"
  apiUrl: string = "http://localhost:3333/api"
  newurl: string = "https://81f210585f96.ngrok.io"
  socket;
  notifaciones: any [] = [];
  logged: boolean = false;
  constructor( private http:HttpClient) {
    this.socket = io(this.url);
  }

  setupSocketConnection(  ) {
  }

  public sendMessage(room, message) {
    this.socket.emit('message',  ({room, message}) );
  }

  public getMessages() {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }

  public online(room) {
    this.socket.emit('online', room);
  }

  send(data: any) {
    this.socket.emit('message', data);
  }

  public leaveRoom(room) {
    this.socket.emit('disconnect', room);
  }

  public getSala() {
    return Observable.create((observer) => {
      this.socket.on('nueva-sala', (sala) => {
        observer.next(sala);
      });
    });
  }

  obtenerConversaciones() {
    const data = {
      idnegocio: "1",
    };
    return this.http.post(`${this.url}/api/getConversationNegocio`, data);
  }

  obtenerChat(iduser: string, idnegocio: number) {
    const data = {
      idnegocio: idnegocio,
      conversacion: iduser
    };
    return this.http.post(`${this.url}/api/getchat`, data);
  }

  obtenerAdminRoom() {
    const data = {
      email: localStorage.getItem('email')
    };
    return this.http.post(`${this.apiUrl}/negocio/obteneridnombrenegocio`, data)
      .pipe( map( (resp: any) => {
        this.online(resp.room);
        return resp;
      }));
  }

  obtenerData() {
    const data = {
      email: localStorage.getItem('email')
    };
    return this.http.post(`${this.apiUrl}/negocio/obteneridnombrenegocio`, data);
  }

}
