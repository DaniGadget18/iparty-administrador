import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../../services/api.services';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ApiRootServices} from '../../../services/api-Root.services';

@Component({
  selector: 'app-informacion-negocio',
  templateUrl: './informacion-negocio.component.html',
  styleUrls: ['./informacion-negocio.component.scss']
})
export class InformacionNegocioComponent implements OnInit {

  informacion: any [] = [];

  id: any;
  constructor( private apiservices: ApiRootServices,
               private activedrouter: ActivatedRoute) {
    this.id = activedrouter.snapshot.params.id;
    this.apiservices.obtenerInfoNegocioRoot(this.id).subscribe( (resp: any) => {
      this.informacion = resp.data[0];
    });

  }

  ngOnInit() {
  }

}
