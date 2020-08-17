import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Menu} from '../../../models/menu.model';

@Component({
  selector: 'app-productos',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  lastPage: number;
  nowPage: number;
  total: number;
  perPage: number;
  menu: Menu[] = [];
  isLoading = true;

  constructor( private apiservice: ApiServices,
               private router: Router) {
    this.apiservice.obtenerMenuNegocio(1).subscribe( (resp: any) => {
      this.menu = resp.data.data;
      this.lastPage = resp.data.lastPage;
      this.nowPage = resp.data.page;
      this.total = resp.data.total;
      this.perPage = resp.data.perPage;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
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

  editarProducto(id: number) {
    this.router.navigate(['/menu/registrar/', id]);
  }

  eliminarProducto(id: number, idx: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Se eliminara el id = ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.value) {
        return this.apiservice.eliminarProductoNegocio(id).subscribe( (resp: any) => {
          this.menu.splice(idx, 1);
          Swal.fire(
            'Eliminado',
            resp.message,
            'success'
          );
        }, (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  changePage(event) {
    if (isNaN(event)) {
      return;
    }
    this.apiservice.obtenerMenuNegocio(event).subscribe( (resp: any) => {
      this.menu = resp.data.data;
      this.lastPage = resp.data.lastPage;
      this.nowPage = resp.data.page;
      this.total = resp.data.total;
      this.perPage = resp.data.perPage;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexion',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
