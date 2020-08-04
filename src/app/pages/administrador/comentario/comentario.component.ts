import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  comentarios: any[] = [];
  rank: number;
  isLoading: boolean = true;

  constructor( private apiservices: ApiServices ) {
    this.apiservices.obtenerComentarios().subscribe( (resp:any) => {
      this.comentarios = resp.data;
      console.log(this.comentarios);
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
      console.log(this.comentarios);
    });
  }

  limpiar(  ) {
    this.apiservices.obtenerComentarios().subscribe( (resp:any) => {
      this.comentarios = resp.data;
      console.log(this.comentarios);
    });
  }


}
