import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NegocioModel} from '../models/negocio.model';
import {UsuarioModel} from '../models/usuario.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class ApiRootServices {
  public categoriasNegocio: any [] = [];
  public categoriaMenu: any [] = [];

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

  registrarRoot( usuario: UsuarioModel ) {
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

  obtenerCategorias() {
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.get(`${environment.url.root}/Categorias`, {headers: header})
      .pipe( map( (resp: any []) => {
        // @ts-ignore
        this.categoriasNegocio = resp.data;
      }));
  }

  obtenerCategoriaMenu() {
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.get(`${environment.url.root}/getAllCategorias`, {headers: header})
      .pipe( map( (resp: any []) => {
        // @ts-ignore
        this.categoriaMenu = resp.data;
      }));
  }

  guardarCategoriaMenu(categoria: string) {
    const header = {
      Authorization: environment.token
    };
    const data = {
      nombre: categoria
    };
    return this.httpclient.post(`${environment.url.root}/crearCategoriaMenu`, data, {headers: header});
  }

  guardarCategoriaNegocio( categorianNegocio: string) {
    const header = {
      Authorization: environment.token
    };
    const data = {
      categoria: categorianNegocio
    };
    return this.httpclient.post(`${environment.url.root}/crearCategoria`, data, {headers: header});
  }

  eliminarCategoriaNegocio( id: number) {
    const header = {
      Authorization: environment.token
    };
    const data = {
      id
    };
    return this.httpclient.post(`${environment.url.root}/borrarCategoria`, data, {headers: header});
  }

  eliminarCategoriaMenu( id: number) {
    const header = {
      Authorization: environment.token
    };
    const data = {
      id
    };
    return this.httpclient.post(`${environment.url.root}/borrarCategoriaMenu`, data, {headers: header});
  }
}
