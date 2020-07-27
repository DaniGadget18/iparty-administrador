import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: any[] = [];

  constructor( private apiservice: ApiServices,
               private router: Router) {
    this.apiservice.obtenerMenuNegocio().subscribe( (resp: any) => {
      this.menu = resp.data[0]["menu"];
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

}
