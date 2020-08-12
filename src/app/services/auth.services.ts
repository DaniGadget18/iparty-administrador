import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthApiServices {
  private url = 'http://localhost:3333/api';
  private token: string;
  public isRoot: boolean;
  public role: string;
  constructor( private httpclient: HttpClient) {
    this.verificarToken();
  }

  login(usuario: UsuarioModel) {
    const data = {
      ...usuario
    };
    return this.httpclient.post(`${this.url}/login`, data)
      .pipe( map( (resp: any) => {
        this.guardarToken(resp.data['token'].token, resp.data.email, resp.isRoot);
        return resp;
      }));
  }

  logOut() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }


  private guardarToken( idToken: string, email: string, root: boolean ) {
    this.isRoot = root;
    this.token = idToken;
    localStorage.setItem('email', email);
    localStorage.setItem('token', idToken);

  }

  verificarToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }

    return this.token;
  }

  isAutenticado(): boolean {
    return this.token.length > 2;
  }

  hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  checkAuth() {
    const header = {
      Authorization: 'bearer ' + localStorage.getItem('token')
    };
    return this.httpclient.get(`${this.url}/check`, {headers: header});
  }

}
