import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiRootServices} from '../../../services/api-Root.services';
import {UsuarioModel} from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss']
})
export class AdministradoresComponent implements OnInit {

  roots: any [] = [];

  usuario = new UsuarioModel();

  constructor( private apiservices: ApiRootServices) {
    this.apiservices.obtenerAdministradores().subscribe( (resp: any) => {
      console.log(resp);
      this.roots = resp.data;
    });
  }

  ngOnInit() {
  }

  registrarRoot(form: NgForm) {

    this.apiservices.registrarRoot(this.usuario).subscribe( (resp: any) => {
      this.roots.push(resp.data);
      Swal.fire({
        icon: 'success',
        title: 'Se ha registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
