import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';
import {NegocioModel} from '../models/negocio.model';

@Injectable()
export class ApiServices {
  url = 'http://localhost:3333';
  constructor( private httpclient: HttpClient ) {
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

  registrarNegocio( negocio: NegocioModel, usuario: UsuarioModel ) {
    const data = {
      nombre: negocio.nombre,
      ubicacion: negocio.ubicacion,
      id_categoria: negocio.idcategoria,
      nombreAdmin: usuario.nombre,
      email: usuario.email,
      password: usuario.password
    };
    return this.httpclient.post(`${this.url}/api/negocio/registrarNegocio`, data);
  }

  obtenerNegocios() {
    return this.httpclient.get(`${this.url}/api/negocio/obtenerNegocios`);
  }
}
