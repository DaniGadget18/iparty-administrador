import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MensajeInterface, MensajeInterfaceResp} from '../interfaces/mensaje.interface';
import {AuthApiServices} from './auth.services';

@Injectable()
export class ChatService {
  socket;
  notifaciones: any [] = [];

  // variables para envio de mensajes
  public idnegocio: number; // id negocio: 1

  public chat: MensajeInterface [] = [];
  public conversaciones: any [] = [];
  logged = false;

  constructor(private http: HttpClient, private authservices: AuthApiServices) {
    this.socket = io(environment.url.socket);
    if (this.authservices.isAutenticado()) {
      this.obtenerAdminRoom().subscribe((resp: any) => {
        console.log('Online');
      }, (error) => {
        console.log('entro aqui');
        console.log('este es el errror que sale', error);
      });
    } else {
      console.log('ya estas online');
    }
  }

  getConversaciones() {
    return this.obtenerData().subscribe((resp: any) => {
      this.idnegocio = resp.data[0]['id']; // id del negocio
      this.obtenerConversaciones(resp.data[0]['id'].toString()).subscribe((conversaciones: any) => {
        this.conversaciones = [];
        for (const conversacion of conversaciones.data) {
          this.conversaciones.unshift(conversacion);
        }
      });
    });
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

  EnviarMensaje(mensaje: string, idUser: number) {
    const data: MensajeInterface = {
      conversacion: 0,
      createdAt: new Date().toString(),
      foto: '',
      from: 0,
      idnegocio: 0,
      mensaje,
      nombre: 'Eduardo Vargas',
      to: 0,
      idsocket: ''
    };
    this.obtenerData().subscribe((resp: any) => {
      data.idnegocio = resp.data[0]['id']; // id del negocio
      data.idsocket = idUser.toString();  // idsocket
      data.foto = 'Foto del usuario '; // TODO falta por definir la foto del usuario
      data.from = resp.data[0]['id']; // id negocio quien lo envia
      data.to = idUser; // id usuario para el que va
      data.conversacion = idUser; // id del usuario convertido en la conversacion
      this.chat.push(data);
      this.socket.emit('message', data);
    });
  }

  obtenerConversaciones(idnegocio: string) {
    const data = {
      idnegocio
    };
    return this.http.post(`${environment.url.apiSocket}/api/getConversationNegocio`, data);
  }

  obtenerChatnuevo(conversacion: string) {
    const data = {
      idnegocio: this.idnegocio.toString(),
      conversacion
    };
    return this.http.post(`${environment.url.apiSocket}/api/getchat`, data)
      .pipe(map((resp: MensajeInterfaceResp[]) => {
        console.log(resp);
        this.chat = [];
        // @ts-ignore
        for (const mensaje of resp.data) {
          this.chat.push(mensaje);
        }
      }));
  }


  obtenerChat(iduser: string, idnegocio: number) {
    const data = {
      idnegocio,
      conversacion: iduser
    };

    return this.http.post(`${environment.url.apiSocket}/api/getchat`, data);
  }

  obtenerAdminRoom() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.http.post(`${environment.url.api}/negocio/obteneridnombrenegocio`, data, {headers: header})
      .pipe(map((resp: any) => {
        this.online(resp.room);
        return resp;
      }));
  }

  private obtenerData() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.http.post(`${environment.url.api}/negocio/obteneridnombrenegocio`, data, {headers: header});
  }


  // Reservacion

  public obtenerReservacion() {
    return Observable.create((observer) => {
      this.socket.on('reservacion', (sala) => {
        observer.next(sala);
      });
    });
  }

}
