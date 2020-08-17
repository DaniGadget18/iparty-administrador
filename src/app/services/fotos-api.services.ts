import {Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';
import {FotoModel} from '../models/foto.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable()
export class ApiFotosServices {
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
    const header = {
      Authorization: environment.token
    };
    this.httpclient.post(`${environment.url.api}/negocio/subirfoto`, data, {headers: header}).subscribe( (resp: any) => {
      console.log(resp);
    });
  }

  obtenerFotosNegocio() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/getFotoByNegocioEmail`, data, {headers: header});
  }

  eliminarFotoNegocio( id: number ) {
    const data = {
      id
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/eliminarFotoNegocio`, data, {headers: header});
  }


}
