import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.scss']
})
export class NegociosComponent implements OnInit {

  negocios: any[] = [];

  constructor( private apiservice: ApiServices,
               private router: Router) {

    this.apiservice.obtenerNegocios().subscribe( (resp: any) => {
      this.negocios = resp.data;
      console.log(this.negocios);
    });

  }

  ngOnInit() {
  }
  informacionNegocio(idnegocio: any) {
    this.router.navigateByUrl('administrador/negocio/informacion');
  }
}
