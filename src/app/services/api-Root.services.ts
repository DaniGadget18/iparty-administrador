import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NegocioModel} from '../models/negocio.model';
import {UsuarioModel} from '../models/usuario.model';

@Injectable()
export class ApiRootServices {
  url = 'http://localhost:3333/api/root';
  token: string = `bearer ${localStorage.getItem('token')}`;
  constructor( private httpclient: HttpClient) {
  }
  existeNegocio(nombre: string) {
    const data = {
      nombre
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/existeNegocio`, data, {headers: header});
  }

  registrarNegocio( negocio: NegocioModel, usuario: UsuarioModel ) {
    const data = {
      nombre: negocio.nombre,
      nombreAdmin: usuario.nombre,
      fecha_nacimiento: usuario.fecha_nacimiento,
      email: usuario.email,
      password: usuario.password
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/registrarNegocio`, data, {headers: header});
  }

  registrarRoot( usuario: UsuarioModel ){
    const data = {
      ...usuario
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/registrarRoot`, data, {headers: header});
  }

  obtenerInfoNegocioRoot(id: any) {
    const data = {
      id
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/obtenerNegociobyid`, data, {headers: header});
  }

  obtenerNegocios() {
    const header = {
      Authorization: this.token
    };
    return this.httpclient.get(`${this.url}/obtenerNegocios`, {headers: header });
  }

  obtenerAdministradores() {
    const header = {
      Authorization: this.token
    };
    return this.httpclient.get(`${this.url}/administradoresroot`, {headers: header});
  }
}
