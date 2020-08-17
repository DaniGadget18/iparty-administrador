import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {NegocioModel} from '../../../models/negocio.model';
import {UsuarioModel} from '../../../models/usuario.model';
import {ApiServices} from '../../../services/api.services';
import Swal from 'sweetalert2';
import {log} from 'util';
import {ApiRootServices} from '../../../services/api-Root.services';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.scss']
})
export class RegistrarNegocioComponent implements OnInit {

  negocio = new NegocioModel();
  usuario = new UsuarioModel();
  form: FormGroup;
  nombre: string;


  constructor( private apiservices: ApiRootServices) {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)], this.existeNegocio.bind(this)),
      email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      nombreAdmin: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      fecha_nacimiento: new FormControl('', Validators.required),

    });

  }

  ngOnInit() {
  }

  registrarNegocioReact() {
    console.log(this.form);
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Datos incompletos / falta un campo',
      });
      return;
    } else {
      this.negocio.nombre = this.form.get('nombre').value;
      this.usuario.email = this.form.get('email').value;
      this.usuario.nombre = this.form.get('nombreAdmin').value;
      this.usuario.password = this.form.get('password').value;
      this.usuario.fecha_nacimiento = this.form.get('fecha_nacimiento').value;
      return this.apiservices.registrarNegocio(this.negocio, this.usuario).subscribe( (resp: any) => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500
        });
      }, (error) => {
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }

  existeNegocio( control: FormControl ): Promise<any> | Observable<any> {
    console.log(control);
    this.apiservices.existeNegocio(control.value).subscribe( async (resp: any) => {
      console.log(resp);
      if (resp.data == null) {
        this.nombre = '';
      } else {
        this.nombre = await resp.data.nombre;
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexion',
        showConfirmButton: false,
        timer: 1500
      });
    });
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value.toLowerCase() === this.nombre.toLowerCase()) {
            resolve( {
              existe: true
            });
          } else {
            resolve( null);
          }
        }, 5000);
      }
    );
    return promesa;
  }
}
