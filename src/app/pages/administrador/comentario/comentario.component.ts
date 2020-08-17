import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {Comentario} from '../../../models/comentario.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  comentarios: Comentario[] = [];
  rank: number;
  isLoading = true;

  constructor( private apiservices: ApiServices ) {
    this.apiservices.obtenerComentarios().subscribe( (resp: any) => {
      this.comentarios = resp.data;
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

  busquedaRank(  ) {
    this.apiservices.obtenerComentariosRank(this.rank).subscribe( (resp: any) => {
      if (resp.data === []) {
        this.comentarios = [];
        return;
      }
      this.comentarios = resp.data;
    });
  }

  limpiar(  ) {
    this.apiservices.obtenerComentarios().subscribe( (resp:any) => {
      this.comentarios = resp.data;
    });
  }


}
