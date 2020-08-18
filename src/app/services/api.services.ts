import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';

import {NegocioModel} from '../models/negocio.model';
import {HorarioModel} from '../models/horario.model';
import {MenuModel} from '../models/menu.model';
import {Evento, EventoModel} from '../models/evento.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable()
export class ApiServices {

  public totalComentarios: number;
  public reservacionesDia: number;
  public promedioRanking: number;

  // grafica barras
  public numeroComentarios: any [] = [];
  public calificaciones: any [] = [];

  // grafica ultimos 7 dias
  public fechas: any [] = [];
  public reservaciones: any [] = [];

  //eventos proxumos
  public eventos: Evento[] = [];

  constructor(private httpclient: HttpClient) {
  }

  obtenerTotalComentarios() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/totalComentarios`, data, {headers: header})
      .pipe( map( (resp: number) => {
        // @ts-ignore
        this.totalComentarios = resp.data[0].total;
      }));
  }

  obtenerReservacionesDia() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/reservacionesDia`, data, {headers: header})
      .pipe( map( (resp: number) => {
        // @ts-ignore
        this.reservacionesDia = resp.data[0].total;
      }));
  }

  obtenerPromedioRanking() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/promedioPopu`, data, {headers: header})
      .pipe( map( (resp: number) => {
        // @ts-ignore
        this.promedioRanking = resp.data[0].popularidad;
      }));
  }

  obtenerComentariosPorRanking() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/comentariosPorEstrellas`, data, {headers: header})
      .pipe( map( (resp: number) => {
        // @ts-ignore
        for (const calificacion of resp.data) {
          const hasCalificacion = this.calificaciones.find( element => element === calificacion.calificacion);
          if (hasCalificacion) {
            return;
          }
          this.calificaciones.push(calificacion.calificacion);
          this.numeroComentarios.push(calificacion.total);
        }
      }));
  }

  obtenerReservaciones7dias() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/reservacionesDiaSemana`, data, {headers: header})
      .pipe( map( (resp: number) => {
        // @ts-ignore
        if (this.reservaciones.length === 0) {
          // @ts-ignore
          for (const reservacion of resp.data) {
            const conversion = new Date(reservacion.dia);
            const nueva = conversion.toLocaleDateString();
            this.fechas.push(nueva);
            this.reservaciones.push(reservacion.total);
          }
        }
      }));
  }

  obtenerEventosProximos() {
    const data = {
      email: localStorage.getItem('email')
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/negocio/eventosProximos`, data, {headers: header})
      .pipe( map( (resp: number) => {
        // @ts-ignore
        this.eventos = resp.data;
      }));
  }



  // termina dashboard

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
    return this.httpclient.get(`${environment.url.root}/Categorias`, {headers: header});
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
      foto: negocio.foto
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
    return this.httpclient.get(`${environment.url.root}/getAllCategorias`, {headers: header});
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


  obtenerInformacionUsuario() {
    const data = {
      email: localStorage.getItem('email'),
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/usuario/informacion`, data, {headers: header});
  }


  editarUsuario( usuario: UsuarioModel ) {
    const data = {
      ...usuario
    };
    const header = {
      Authorization: environment.token
    };
    return this.httpclient.post(`${environment.url.api}/usuario/update`, data, {headers: header});
  }

  buscarReservaciones(nombre: string, fecha: string) {
    let data = {};
    if (nombre) {
      data = {
        data: nombre
      };
    } else {
       data = {
        data: fecha
      };
    }
    const header = {
      Authorization: environment.token
    };
    console.log(data);
    return this.httpclient.post(`${environment.url.api}/negocio/buscarReservacion`, data, {headers: header});
  }

  enviarEmail( email: string ) {
    const data = {
      email
    };
    return this.httpclient.post(`${environment.url.api}/recuperacion`, data);
  }

  verificarCodigo( email: string, codigo: string) {
    const data = {
      email,
      codigo
    };
    return this.httpclient.post(`${environment.url.api}/validacioncodigo`, data);
  }
}
