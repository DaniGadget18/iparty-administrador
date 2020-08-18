import { Component, OnInit } from '@angular/core';
import {ApiRootServices} from '../../../services/api-Root.services';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complementos',
  templateUrl: './complementos.component.html',
  styleUrls: ['./complementos.component.scss']
})
export class ComplementosComponent implements OnInit {

  categoriaNombre: string;
  categorianegocioNombre: string;

  constructor( public apirootservices: ApiRootServices) {
    this.apirootservices.obtenerCategorias().subscribe();
    this.apirootservices.obtenerCategoriaMenu().subscribe();

  }

  ngOnInit() {
  }

  guardarCategoriaMenu( form: NgForm ) {
    console.log(form);
    if (form.valid === false) {
      Swal.fire({
        icon: 'error',
        title: 'Te falta llenar el campo',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.apirootservices.guardarCategoriaMenu(this.categoriaNombre).subscribe( (resp: any) => {
      this.apirootservices.categoriaMenu.push(resp.data);
      Swal.fire({
        icon: 'success',
        title: 'Se ha registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.categoriaNombre = '';
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: error.error.error,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  guardarCategoriaNegocio( form: NgForm ) {
    if (!form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'te falta llenar el campo',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.apirootservices.guardarCategoriaNegocio( this.categorianegocioNombre ).subscribe( (resp: any) => {
      this.apirootservices.categoriasNegocio.push(resp.data);
      Swal.fire({
        icon: 'success',
        title: 'Se ha registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.categorianegocioNombre = '';
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'hubo un error',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  eliminarCategoriaNegocio( id: number, idx: number) {
    this.apirootservices.eliminarCategoriaNegocio(id).subscribe( (resp: any) => {
      this.apirootservices.categoriasNegocio.splice(idx, 1);
      Swal.fire({
        icon: 'success',
        title: 'Se ha eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'hubo un error',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  eliminarCategoriaMenu(id: number, idx: number) {
    this.apirootservices.eliminarCategoriaMenu(id).subscribe( (resp: any) => {
      this.apirootservices.categoriaMenu.splice(idx, 1);
      Swal.fire({
        icon: 'success',
        title: 'Se ha eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'hubo un error',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
