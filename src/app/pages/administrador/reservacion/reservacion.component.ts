import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {ChatService} from '../../../services/chat.services';
import {Reservacion} from '../../../models/reservacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss']
})
export class ReservacionComponent implements OnInit {

  reservaciones: Reservacion[] = [];
  lastPage: number;
  nowPage: number;
  total: number;
  perPage: number;
  isLoading = true;

  constructor( private apiservices: ApiServices, private chatservices: ChatService ) {
    this.apiservices.obtenerReservaciones(1).subscribe( (resp: any) => {
      this.reservaciones = resp.data.data;
      this.lastPage = resp.data.lastPage;
      this.nowPage = resp.data.page;
      this.total = resp.data.total;
      this.perPage = resp.data.perPage;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = true;
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexion / token invalido',
        showConfirmButton: false,
        timer: 1500
      });
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
      this.reservaciones.push(data);
    });
  }

  ngOnInit() {
  }

  changePage(event) {
    if (isNaN(event)) {
      return;
    }
    this.apiservices.obtenerReservaciones(event).subscribe( (resp: any) => {
      this.reservaciones = resp.data.data;
      this.lastPage = resp.data.lastPage;
      this.nowPage = resp.data.page;
      this.total = resp.data.total;
      this.perPage = resp.data.perPage;
    });
}

}
