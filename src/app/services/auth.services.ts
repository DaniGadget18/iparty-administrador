import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthApiServices {
  url = 'http://localhost:3333/api';
  constructor( private httpclient: HttpClient,) {
  }

  login(usuario: UsuarioModel) {
    const data = {
      ...usuario
    };
    return this.httpclient.post(`${this.url}/login`, data)
      .pipe( map( (resp: any) => {
        localStorage.setItem('email', resp.data.email);
        localStorage.setItem('token', resp.data["token"].token);
        return resp;
      }));
  }

}
