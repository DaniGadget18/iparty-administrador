import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NegocioModel} from '../../../models/negocio.model';
import {UsuarioModel} from '../../../models/usuario.model';
import {ApiServices} from '../../../services/api.services';
import Swal from 'sweetalert2';
import {log} from 'util';

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.scss']
})
export class RegistrarNegocioComponent implements OnInit {

  negocio = new NegocioModel();
  usuario = new UsuarioModel();

  constructor( private apiServices: ApiServices) { }

  ngOnInit() {
  }

  registrarNegocio(form: NgForm) {

    return this.apiServices.registrarNegocio(this.negocio, this.usuario).subscribe( (resp: any) => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      console.log(error.error);
      Swal.fire({
        icon: 'error',
        title: error.error.error,
        showConfirmButton: false,
        timer: 1500
      });
    });

  }

}
