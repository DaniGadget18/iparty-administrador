import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ChatService} from './chat.services';


@Injectable()
export class AuthApiServices {
  private url = 'http://localhost:3333/api';
  private token: string;
  public isRoot: boolean;
  public role: string;
  tokenValid: string;
  constructor( private httpclient: HttpClient) {
    this.verificarToken();
  }

  login(usuario: UsuarioModel) {
    const data = {
      ...usuario
    };
    return this.httpclient.post(`${environment.url.api}/login`, data)
      .pipe( map( (resp: any) => {
        this.guardarToken(resp.data['token'].token, resp.data.email, resp.isRoot);
        return resp;
      }));
  }

  newToken() {
    const data = {
      refresh: localStorage.getItem('refresh')
    };
    return this.httpclient.post(`${environment.url.api}/newtoken`, data);
  }

  logOut() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }


  private guardarToken( idToken: string, email: string, root: boolean ) {
    this.isRoot = root;
    this.token = idToken;
    localStorage.setItem('email', email);
    localStorage.setItem('token', idToken);
    const hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());

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

    if (this.token.length < 2) {
      return false;
    }

    if (localStorage.getItem('token')) {
      if (environment.token === undefined) {
        // @ts-ignore
        environment.token = `bearer ${localStorage.getItem('token')}`;
      } else if (environment.token !== localStorage.getItem('token')) {
        // @ts-ignore
        environment.token = `bearer ${localStorage.getItem('token')}`;
      }
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate > new Date()) {
      return true;
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('expira');
      return false;
    }

  }

  hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  checkAuth() {
    const header = {
      Authorization: 'bearer ' + localStorage.getItem('token')
    };
    return this.httpclient.get(`${environment.url.api}/check`, {headers: header});
  }


}
