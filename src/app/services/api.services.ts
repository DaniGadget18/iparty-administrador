import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {finalize, map} from 'rxjs/operators';
import {NegocioModel} from '../models/negocio.model';
import {HorarioModel} from '../models/horario.model';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class ApiServices {
  url = 'http://localhost:3333/api';
  constructor( private httpclient: HttpClient,
               private storage: AngularFireStorage) {
  }


  registrarNegocio( negocio: NegocioModel, usuario: UsuarioModel ) {
    const data = {
      nombre: negocio.nombre,
      nombreAdmin: usuario.nombre,
      fecha_nacimiento: usuario.fecha_nacimiento,
      email: usuario.email,
      password: usuario.password
    };
    return this.httpclient.post(`${this.url}/negocio/registrarNegocio`, data);
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

  obtenerInfoNegocioRoot(id: any) {
    const data = {
      id: id
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerNegociobyid`, data);
  }

  obtenerNegocios() {
    return this.httpclient.get(`${this.url}/negocio/obtenerNegocios`);
  }
}
