import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {Comentario} from '../../../models/comentario.model';

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
      console.log(error);
    });
  }

  ngOnInit() {
  }

  busquedaRank(  ) {
    this.apiservices.obtenerComentariosRank(this.rank).subscribe( (resp: any) => {
      this.comentarios = resp.data;
    });
  }

  limpiar(  ) {
    this.apiservices.obtenerComentarios().subscribe( (resp:any) => {
      this.comentarios = resp.data;
    });
  }


}
