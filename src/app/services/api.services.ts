import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import {NegocioModel} from '../models/negocio.model';
import {HorarioModel} from '../models/horario.model';
import {MenuModel} from '../models/menu.model';
import {EventoModel} from '../models/evento.model';
import {Observable} from 'rxjs';



@Injectable()
export class ApiServices {
  url2 = 'https://c3fdb5e8ef62.ngrok.io/api';
  url = 'http://localhost:3333/api';
  url_socket = 'http://localhost:3000/api';
  token: string =  `bearer ${localStorage.getItem('token')}`;
  constructor( private httpclient: HttpClient) {
  }

  obtenerInfoNegocio(usuario: UsuarioModel) {
    const data = {
      email: usuario.email
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerNegocio`, data, {headers: header});
  }

  actualizarNegocio(negocio: NegocioModel) {
    const data = {
      email: localStorage.getItem('email'),
      nombre: negocio.nombre,
      ubicacion: negocio.ubicacion,
      id_categoria: negocio.idcategoria,
      informacion: negocio.informacion,
      lat: negocio.lat,
      lng: negocio.lng,
      foto: null
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/editarNegocio`, data, {headers: header});
  }

  actualizarHorariosNegocio( horarios: HorarioModel ) {
    const data = {
      email: localStorage.getItem('email'),
      ...horarios
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/updateHorarioNegocio`, data, {headers: header});

  }

  obtenerMenuNegocio() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/getAllMenuByNegocio`, data, {headers: header});
  }

  obtenerCategoriasMenu() {
    const header = {
      Authorization: this.token
    };
    return this.httpclient.get(`${this.url}/negocio/getAllCategorias`, {headers: header});
  }

  obtenerMenuid(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerMenuid`, data, { headers: header });
  }

  registrarProductoNegocio(menu: MenuModel) {
    const data = {
      email: localStorage.getItem('email'),
      ...menu
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/registrarProductoNegocio`, data, {headers: header});
  }

  editarProductoNegocio(menu: MenuModel) {
    const data = {
      ...menu
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/updateMenuByNegocio`, data, {headers: header});
  }

  eliminarProductoNegocio(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/eliminarProducto`, data, {headers: header});
  }

  obtenerComentarios() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/comentarios`, data, {headers: header});
  }

  obtenerComentariosRank( rank: number ) {
    const data = {
      email: localStorage.getItem('email'),
      rank
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/comentariosranked`, data, {headers: header});
  }

  obtenerEventos() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerEventos`, data, {headers: header});
  }

  obtenerEventosFecha( fecha: string) {
    const data = {
      email: localStorage.getItem('email'),
      fecha
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerEventosFecha`, data, {headers: header});
  }

  registrarEvento( evento: EventoModel ) {
    const data = {
      email: localStorage.getItem('email'),
      ...evento
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/registrarEvento`, data, {headers: header});
  }

  obtenerEventoById(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerEvento`, data, {headers: header});
  }

  eliminarEvento(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/eliminarEvento`, data, {headers: header});
  }

  editarEvento(evento: EventoModel) {
    const data = {
      ...evento
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/editarEvento`, data, {headers: header});
  }

  obtenerReservaciones() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: this.token
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerReservaciones`, data, {headers: header});
  }




}
