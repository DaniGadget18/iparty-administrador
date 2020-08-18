import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {Router} from '@angular/router';
import {ApiRootServices} from '../../../services/api-Root.services';
import Swal from "sweetalert2";

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.scss']
})
export class NegociosComponent implements OnInit {

  negocios: any[] = [];
  fondo: HTMLElement;

  constructor( private apiservice: ApiRootServices,
               private router: Router) {
    this.fondo = document.getElementById('body');
    this.fondo.style.background = '#f2edf3';

    this.apiservice.obtenerNegocios().subscribe( (resp: any) => {
      console.log(resp);
      this.negocios = resp.data;
    }, (error) => {
      console.log(error);
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

  informacionNegocio(idnegocio: any) {
    this.router.navigateByUrl('administrador/negocio/informacion');
  }
}
