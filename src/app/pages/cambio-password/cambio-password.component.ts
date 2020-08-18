import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../services/api.services';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.scss']
})
export class CambioPasswordComponent implements OnInit {
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

}
