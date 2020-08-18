import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../services/chat.services';
import {MensajeInterface} from '../../../interfaces/mensaje.interface';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  elemento: any;
  conversaciones: any [] = [];
  chats: any [] = [];

  iduser: string; // id de la conversacion
  mensaje: string;
  indexchat: number;
  chatpanel: any;
  constructor( public apichatservice: ChatService ) {
    this.apichatservice.chat = [];
    this.apichatservice.getMessages().subscribe( (resp: any) => {
      if (this.iduser == null) {
        return;
      }
      if (this.iduser == resp.conversacion) {
        this.apichatservice.chat.push(resp);
        setTimeout( () => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
          this.apichatservice.getConversaciones();

        }, 20 );
      }
    });
    this.apichatservice.getConversaciones();
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    this.apichatservice.EnviarMensaje(this.mensaje, Number(this.iduser));
    setTimeout( () => {
      this.elemento.scrollTop = this.elemento.scrollHeight;
    }, 100 );

  }

  mostrarConversacionNuevo(iduser: string, idx: number) {
    this.iduser = iduser;
    this.indexchat = idx;
    this.apichatservice.obtenerChatnuevo(iduser).subscribe( () => {
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20 );
    });
  }

}
