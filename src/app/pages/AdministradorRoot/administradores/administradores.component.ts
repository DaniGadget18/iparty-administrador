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
      this.roots = resp.data;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexion',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  ngOnInit() {
  }

  registrarRoot(form: NgForm) {
    if (!form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Falta algun campo / campo invalido',
      });
      return;
    } else {
      this.apiservices.registrarRoot(this.usuario).subscribe( (resp: any) => {
        this.roots.push(resp.data);
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }, (error) => {
        if (error.error.type === 'token') {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }

  eliminarUsuario( id: number, email: string, idx: number ) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se eliminara el usuario: " + email,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this.apiservices.eliminarUsuario(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado',
            'Se a eliminado correctamente',
            'success'
          );
          this.roots.splice(idx, 1);
        }, (error) => {
          console.log(error);
          Swal.fire(
            'Ocurrio un error!',
            error.error.message,
            'error'
          );
        });
      }
    });
  }

}
