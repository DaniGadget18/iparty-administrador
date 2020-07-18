import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../services/api.services';
import {UsuarioModel} from '../../models/usuario.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  intro: HTMLElement;
  wrapper: HTMLElement;

  usuario: UsuarioModel = new UsuarioModel();

  constructor( private apiservice: ApiServices, private router: Router) {
    this.intro = document.getElementById('body');
    this.intro.classList.add('body-login');
    this.wrapper = document.getElementById('content-wrapper-body');
    this.wrapper.style.background = 'none';
  }
  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form);
    this.usuario.email = form.value.email;
    this.usuario.password = form.value.password;
    return this.apiservice.login(this.usuario).subscribe( (resp: any) => {
      if (resp.message === 'ok') {
        this.router.navigateByUrl('dashboard');
      }
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
