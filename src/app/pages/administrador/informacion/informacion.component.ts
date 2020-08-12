import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import {Negocio, NegocioModel} from '../../../models/negocio.model';

import {ApiServices} from '../../../services/api.services';
import {UsuarioModel} from '../../../models/usuario.model';
import { MouseEvent } from '@agm/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  lat = 25.538653133058357 ;
  lng = -103.3950567411292;
  usuario = new UsuarioModel();
  negocio = new NegocioModel();
  isLoading = true;


  constructor( private apiservices: ApiServices ) {
    this.usuario.email = localStorage.getItem('email');
    this.apiservices.obtenerInfoNegocio(this.usuario).subscribe( (resp: Negocio) => {
      this.negocio.nombre = resp.data[0].nombre;
      this.negocio.ubicacion = resp.data[0].ubicacion;
      this.negocio.informacion = resp.data[0].informacion;
      this.negocio.idcategoria = resp.data[0].id_categoria;
      this.negocio.lat = resp.data[0].lat;
      this.negocio.lng = resp.data[0].lng;
      this.lng = resp.data[0].lng;
      this.lat = resp.data[0].lat;
      this.isLoading = false;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  actulizarInfoNegocio(form: NgForm) {
    this.negocio.lat = this.lat;
    this.negocio.lng = this.lng;
    this.apiservices.actualizarNegocio(this.negocio).subscribe( (resp: any ) => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error en el sistema' + error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  getMapClick($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }


}
