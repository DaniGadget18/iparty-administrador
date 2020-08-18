import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../services/api.services';

@Component({
  selector: 'app-verficar-codigo',
  templateUrl: './verficar-codigo.component.html',
  styleUrls: ['./verficar-codigo.component.scss']
})
export class VerficarCodigoComponent implements OnInit {
  codigo: string;
  email: string;
  intro: HTMLElement;
  wrapper: HTMLElement;
  constructor( private apiservices: ApiServices ) {
    this.intro = document.getElementById('body');
    this.intro.classList.add('body-login');
    this.wrapper = document.getElementById('content-wrapper-body');
    this.wrapper.style.background = 'none';
  }

  ngOnInit() {
  }

  verificarCodigo() {
    this.apiservices.verificarCodigo(this.email, this.codigo).subscribe( (resp: any) => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    });
  }

}
