import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';

import {NegocioModel} from '../models/negocio.model';
import {HorarioModel} from '../models/horario.model';
import {MenuModel} from '../models/menu.model';
import {EventoModel} from '../models/evento.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable()
export class ApiServices {

  constructor(private httpclient: HttpClient) {
  }

  obtenerInfoNegocio(usuario: UsuarioModel) {
    const data = {
      email: usuario.email
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/obtenerNegocio`, data, {headers: header});
  }

  obtenerCategorias() {
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.get(`${environment.url.api}/negocio/Categorias`, {headers: header});
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
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/editarNegocio`, data, {headers: header});
  }

  actualizarHorariosNegocio(horarios: HorarioModel) {
    const data = {
      email: localStorage.getItem('email'),
      ...horarios
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/updateHorarioNegocio`, data, {headers: header});

  }

  obtenerMenuNegocio(page: number) {
    const data = {
      email: localStorage.getItem('email'),
      page
    };
    const header = {
      Authorization: environment.token,
    };
    return this.httpclient.post(`${environment.url.api}/negocio/getAllMenuByNegocio`, data, {headers: header});
  }

  obtenerCategoriasMenu() {
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.get(`${environment.url.api}/negocio/getAllCategorias`, {headers: header});
  }

  obtenerMenuid(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/obtenerMenuid`, data, {headers: header});
  }

  registrarProductoNegocio(menu: MenuModel) {
    const data = {
      email: localStorage.getItem('email'),
      ...menu
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/registrarProductoNegocio`, data, {headers: header});
  }

  editarProductoNegocio(menu: MenuModel) {
    const data = {
      ...menu
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/updateMenuByNegocio`, data, {headers: header});
  }

  eliminarProductoNegocio(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/eliminarProducto`, data, {headers: header});
  }

  obtenerComentarios() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/comentarios`, data, {headers: header});
  }

  obtenerComentariosRank(rank: number) {
    const data = {
      email: localStorage.getItem('email'),
      rank
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/comentariosranked`, data, {headers: header});
  }

  obtenerEventos() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/obtenerEventos`, data, {headers: header});
  }

  obtenerEventosFecha(fecha: Date) {
    const data = {
      email: localStorage.getItem('email'),
      fecha
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/obtenerEventosFecha`, data, {headers: header});
  }

  registrarEvento(evento: EventoModel) {
    const data = {
      email: localStorage.getItem('email'),
      ...evento
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/registrarEvento`, data, {headers: header});
  }

  obtenerEventoById(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/obtenerEvento`, data, {headers: header});
  }

  eliminarEvento(id: number) {
    const data = {
      id
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/eliminarEvento`, data, {headers: header});
  }

  editarEvento(evento: EventoModel) {
    const data = {
      ...evento
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/editarEvento`, data, {headers: header});
  }

  obtenerReservaciones(page: number) {
    const data = {
      email: localStorage.getItem('email'),
      page
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/obtenerReservaciones`, data, {headers: header});
  }


}
