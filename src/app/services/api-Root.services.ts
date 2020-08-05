import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NegocioModel} from '../models/negocio.model';
import {UsuarioModel} from '../models/usuario.model';

@Injectable()
export class ApiRootServices {
  url = 'http://localhost:3333/api/root';
  constructor( private httpclient: HttpClient) {
  }
  existeNegocio(nombre: string) {
    const data = {
      nombre
    };
    return this.httpclient.post(`${this.url}/existeNegocio`, data);
  }

  registrarNegocio( negocio: NegocioModel, usuario: UsuarioModel ) {
    const data = {
      nombre: negocio.nombre,
      nombreAdmin: usuario.nombre,
      fecha_nacimiento: usuario.fecha_nacimiento,
      email: usuario.email,
      password: usuario.password
    };
    return this.httpclient.post(`${this.url}/registrarNegocio`, data);
  }

  registrarRoot( usuario: UsuarioModel ){
    const data = {
      ...usuario
    };
    return this.httpclient.post(`${this.url}/registrarRoot`, data);
  }

  obtenerInfoNegocioRoot(id: any) {
    const data = {
      id
    };
    return this.httpclient.post(`${this.url}/obtenerNegociobyid`, data);
  }

  obtenerNegocios() {
    return this.httpclient.get(`${this.url}/obtenerNegocios`);
  }

  obtenerAdministradores() {
    return this.httpclient.get(`${this.url}/administradoresroot`);
  }
}
