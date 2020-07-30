import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventos: any [] = [];
  fecha: any;

  constructor( private apiservices: ApiServices ) {
    this.apiservices.obtenerEventos().subscribe( (resp: any) => {
      console.log(resp);
      this.eventos = resp.data;
      console.log(this.eventos);
    });
  }

  ngOnInit() {
  }

  obtenerEventosFecha() {
    this.apiservices.obtenerEventosFecha(this.fecha).subscribe( (resp: any) => {
      console.log(resp);
      this.eventos = resp.data;
      console.log(this.eventos);
    });
  }

  limpiarEventos() {
    this.apiservices.obtenerEventos().subscribe( (resp: any) => {
      console.log(resp);
      this.eventos = resp.data;
      console.log(this.eventos);
    });
  }


}
