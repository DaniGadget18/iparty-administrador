import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import {NegocioModel} from '../models/negocio.model';
import {HorarioModel} from '../models/horario.model';
import {MenuModel} from '../models/menu.model';



@Injectable()
export class ApiServices {
  url = 'http://localhost:3333/api';
  constructor( private httpclient: HttpClient) {
  }

  obtenerInfoNegocio(usuario: UsuarioModel) {
    const data = {
      email: usuario.email
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerNegocio`, data);
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
    return this.httpclient.post(`${this.url}/negocio/editarNegocio`, data);
  }

  actualizarHorariosNegocio( horarios: HorarioModel ) {
    const data = {
      email: localStorage.getItem('email'),
      ...horarios
    };
    return this.httpclient.post(`${this.url}/negocio/updateHorarioNegocio`, data);

  }

  obtenerMenuNegocio() {
    const data = {
      email: localStorage.getItem('email')
    };
    return this.httpclient.post(`${this.url}/negocio/getAllMenuByNegocio`, data);
  }

  obtenerCategoriasMenu() {
    return this.httpclient.get(`${this.url}/negocio/getAllCategorias`);
  }

  obtenerMenuid(id: number) {
    const data = {
      id
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerMenuid`, data);
  }

  registrarProductoNegocio(menu: MenuModel) {
    const data = {
      email: localStorage.getItem('email'),
      ...menu
    };
    return this.httpclient.post(`${this.url}/negocio/registrarProductoNegocio`, data);
  }

  editarProductoNegocio(menu: MenuModel) {
    const data = {
      ...menu
    };
    return this.httpclient.post(`${this.url}/negocio/updateMenuByNegocio`, data);
  }

  eliminarProductoNegocio(id: number) {
    const data = {
      id
    };
    return this.httpclient.post(`${this.url}/negocio/eliminarProducto`, data);
  }

  obtenerComentarios() {
    const data = {
      email: localStorage.getItem('email')
    };
    return this.httpclient.post(`${this.url}/negocio/comentarios`, data);
  }

  obtenerComentariosRank( rank: number ) {
    const data = {
      email: localStorage.getItem('email'),
      rank
    };
    return this.httpclient.post(`${this.url}/negocio/comentariosranked`, data);
  }

  obtenerEventos() {
    const data = {
      email: localStorage.getItem('email')
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerEventos`, data);
  }

  obtenerEventosFecha( fecha: string) {
    const data = {
      email: localStorage.getItem('email'),
      fecha
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerEventosFecha`, data);
  }



}
