import { Component, OnInit } from '@angular/core';
import {ApiServices} from '../../services/api.services';
import {UsuarioModel} from '../../models/usuario.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthApiServices} from '../../services/auth.services';
import {ChatService} from '../../services/chat.services';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  intro: HTMLElement;
  wrapper: HTMLElement;

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private apiservice: AuthApiServices, private router: Router, private apichatservices: ChatService) {
    this.intro = document.getElementById('body');
    this.intro.classList.add('body-login');
    this.wrapper = document.getElementById('content-wrapper-body');
    this.wrapper.style.background = 'none';
  }
  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form);
    var undefin="";
    var usu = form.value.email;
    var pass = form.value.password;
    console.log(usu, pass);
    if (usu == null || pass == null || pass == "" || usu == "") {
      if (usu == null || usu == "") {
        undefin="Ingrese el Usuario"
      }
      else {
        undefin="Ingrese la Contraseña"
      }
      Swal.fire({
        icon: 'error',
        title: undefin,
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      this.usuario.email = form.value.email;
      this.usuario.password = form.value.password;
      return this.apiservice.login(this.usuario).subscribe((resp: any) => {
        console.log(resp);
        if (resp.message === 'ok') {
          this.apichatservices.setupSocketConnection();
          this.apichatservices.online(resp.data.allData[0]['id']);
          this.router.navigateByUrl('dashboard');
        }
      }, error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.error,
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }

}
