import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import {NegocioModel} from '../../../models/negocio.model';

import {ApiServices} from '../../../services/api.services';
import {UsuarioModel} from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  usuario = new UsuarioModel();
  negocio = new NegocioModel();
  lunesinicio: string;
  lunesfin: string;
  martesinicio: string;
  martesfin: string;
  miercolesinicio: string;
  miercolesfin: string;
  juevesinicio: string;
  juevesfin: string;
  viernesinicio: string;
  viernesfin: string;
  sabadoinicio: string;
  sabadofin: string;
  domingoinicio: string;
  domingofin: string;


  constructor( private apiservices: ApiServices ) {
    this.usuario.email = localStorage.getItem('email');
    this.apiservices.obtenerInfoNegocio(this.usuario).subscribe( (resp: any) => {
      console.log(resp);
      this.negocio.nombre = resp.data[0].nombre;
      this.negocio.ubicacion = resp.data[0].ubicacion;
      this.negocio.informacion = resp.data[0].informacion;
      this.negocio.idcategoria = resp.data[0].id_categoria;
      this.negocio.lat = resp.data[0].lat;
      this.negocio.lng = resp.data[0].lng;
    });
  }

  ngOnInit() {
  }

  actulizarInfoNegocio(form: NgForm) {
    this.apiservices.actualizarNegocio(this.negocio).subscribe( (resp: any ) => {
      Swal.fire({
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error en el sistema' + error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
