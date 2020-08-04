import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../services/chat.services';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  conversaciones: any [] = [];
  chats: any [] = [];
  idadministrador: number;
  idadmin: string;
  idnegocio: number;
  idChat: string;
  mensaje: string;
  indexchat: number;
  chatpanel: any;
  constructor( private apichatservice: ChatService ) {
    this.apichatservice.obtenerConversaciones().subscribe( (resp: any) => {
      this.conversaciones = resp.data;
      console.log(resp);
    });
    this.apichatservice.obtenerData().subscribe( (resp: any) => {
      this.idadmin = resp.data[0]['id'];
      this.idadministrador = resp.data[0]['id'] + resp.data[0]['nombre'];
      this.idnegocio = resp.data[0]['id'];
    });

  }

  ngOnInit() {
    this.apichatservice.getMessages().subscribe( (resp: any) => {
      this.chats.push(resp);
      for (let i = 0;  i < this.conversaciones.length; i++) {
        if (this.conversaciones[i].last['conversacion'] == resp.conversacion) {
          console.log('ya esta la conversacion adentro');
        } else {
          const nuevo = {
            last: {
              resp
            }
          };
          this.conversaciones.push(nuevo);
        }
      }
    });
  }

  send() {
    const data = {
      from: "1",
      to: "1",
      idnegocio: 1,
      createdAt:'2020/07/02',
      mensaje: "Ay mi madre, mi bicho",
      nombre: "administrador",
      foto: "safesadfewfewsafdews",
      conversacion: ""
    };
    const date = new Date(Date.now());
    const fecha = date.getDate()  + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +
      date.getHours() + ":" + date.getMinutes();
    this.apichatservice.obtenerData().subscribe( (resp: any) => {
      data.idnegocio = this.idnegocio;
      data.createdAt = fecha;
      data.mensaje = this.mensaje;
      data.nombre = resp.data[0].usuario[0]['nombre'];
      //data.foto = resp.data[0].usuario[0]['foto'];
      data.foto = 'foto del usuario';
      data.to = this.idChat;
      data.conversacion = this.idChat;
      data.from = this.idadministrador.toString();
      this.chats.push(data);
      this.apichatservice.send(data);
    });
  }

  mostrarConversacion(iduser: string, idx: number) {
    console.log(iduser);
    this.idChat = iduser;
    this.indexchat = idx;

    this.apichatservice.obtenerChat(iduser, this.idnegocio).subscribe( (resp: any) => {
      this.chats = resp.data;
    });


  }

}
