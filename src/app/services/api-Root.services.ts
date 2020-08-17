import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NegocioModel} from '../models/negocio.model';
import {UsuarioModel} from '../models/usuario.model';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiRootServices {
  constructor( private httpclient: HttpClient) {
  }
  existeNegocio(nombre: string) {
    const data = {
      nombre
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.root}/existeNegocio`, data, {headers: header});
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
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.root}/registrarNegocio`, data, {headers: header});
  }

  registrarRoot( usuario: UsuarioModel ){
    const data = {
      ...usuario
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.root}/registrarRoot`, data, {headers: header});
  }

  obtenerInfoNegocioRoot(id: any) {
    const data = {
      id
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.root}/obtenerNegociobyid`, data, {headers: header});
  }

  obtenerNegocios() {
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.get(`${environment.url.root}/obtenerNegocios`, {headers: header });
  }

  obtenerAdministradores() {
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.get(`${environment.url.root}/administradoresroot`, {headers: header});
  }

  eliminarUsuario( id: number ) {
    const header = {
      Authorization: environment.token
    };
    const data = {
      id
    };
    return this.httpclient.post(`${environment.url.root}/eliminarUsuario`, data, {headers: header});
  }
}
