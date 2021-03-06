import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../services/api.services';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
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

  recuperarPassword( form: NgForm ) {
    if (!form.valid) {
      return;
    }
    this.apiservices.enviarEmail(this.email).subscribe( (resp: any) => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    });
  }
}
