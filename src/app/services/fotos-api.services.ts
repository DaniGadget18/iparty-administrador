import {Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';
import {FotoModel} from '../models/foto.model';
import {Observable} from 'rxjs';


@Injectable()
export class ApiFotosServices {
  url = 'http://localhost:3333/api';
  constructor( private httpclient: HttpClient,
               private storage: AngularFireStorage) {
  }

  private CARPETA_IMAGENES = 'img';
  public urlnuevo: any;
  urlImage: Observable<string>;
  guardarImagenBD( imagen: { nombre: string, url: string  } ) {
    const data = {
      email: localStorage.getItem('email'),
      url: imagen.url
    };
    this.httpclient.post(`${this.url}/negocio/subirfoto`, data).subscribe( (resp: any) => {
      console.log(resp);
    });
  }

  obtenerFotosNegocio() {
    const data = {
      email: localStorage.getItem('email')
    };
    return this.httpclient.post(`${this.url}/negocio/getFotoByNegocioEmail`, data);
  }


}
