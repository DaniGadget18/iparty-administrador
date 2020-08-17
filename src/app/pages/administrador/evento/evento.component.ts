import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import Swal from 'sweetalert2';
import {Evento} from '../../../models/evento.model';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventos: Evento [] = [];
  fecha: Date;
  isLoading = true;
  constructor( private apiservices: ApiServices ) {
    this.apiservices.obtenerEventos().subscribe( (resp: any) => {
      this.eventos = resp.data;
      this.isLoading = false;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexion',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  ngOnInit() {
  }

  obtenerEventosFecha() {
    this.apiservices.obtenerEventosFecha(this.fecha).subscribe( (resp: any) => {
      this.eventos = resp.data;
    });
  }

  limpiarEventos() {
    this.apiservices.obtenerEventos().subscribe( (resp: any) => {
      this.eventos = resp.data;
    });
  }

  eliminarEvento(id: number, index: number) {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar el evento?',
      text: "Se eliminara el evento " + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        return this.apiservices.eliminarEvento(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado',
            resp.message,
            'success'
          );
          this.eventos.splice(index, 1);
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }


}
