import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {ChatService} from '../../../services/chat.services';
import {Reservacion} from '../../../models/reservacion.model';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss']
})
export class ReservacionComponent implements OnInit {

  reservaciones: Reservacion[] = [];

  constructor( private apiservices: ApiServices, private chatservices: ChatService ) {
    this.apiservices.obtenerReservaciones().subscribe( (resp: any) => {
      this.reservaciones = resp.data;
    });

    this.chatservices.obtenerReservacion().subscribe( (resp: any) => {
      const data: Reservacion = {
        dia: resp.dia,
        confirmacion: resp.confirmacion,
        personas: resp.personas,
        zona: resp.zona,
        usuario: {
          nombre: resp.nombre
        }
      };
      console.log(data);
      this.reservaciones.push(data);
    });
  }

  ngOnInit() {
  }

}
