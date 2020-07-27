import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiRootServices {
  url = 'http://localhost:3333/api';
  constructor( private httpclient: HttpClient) {
  }


  obtenerInfoNegocioRoot(id: any) {
    const data = {
      id
    };
    return this.httpclient.post(`${this.url}/negocio/obtenerNegociobyid`, data);
  }

  obtenerNegocios() {
    return this.httpclient.get(`${this.url}/negocio/obtenerNegocios`);
  }
}
