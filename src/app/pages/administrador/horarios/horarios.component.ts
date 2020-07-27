import { Component, OnInit } from '@angular/core';
import {HorarioModel} from '../../../models/horario.model';
import {ApiServices} from '../../../services/api.services';
import {NgForm} from '@angular/forms';
import {NegocioModel} from '../../../models/negocio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  horario = new HorarioModel();
  negocio = new NegocioModel();

  constructor( private apiservices: ApiServices) { }

  ngOnInit() {
  }

  actalizarHorariosNegocio(form: NgForm) {
    console.log(form);
    this.horario.lunes = form.value.lunes_inicio + '-' + form.value.lunes_fin;
    this.horario.martes = form.value.martes_inicio + '-' + form.value.martes_fin;
    this.horario.miercoles = form.value.miercoles_inicio + '-' + form.value.miercoles_fin;
    this.horario.jueves = form.value.jueves_inicio + '-' + form.value.jueves_fin;
    this.horario.viernes = form.value.viernes_inicio + '-' + form.value.viernes_fin;
    this.horario.sabado = form.value.sabado_inicio + '-' + form.value.sabado_fin;
    this.horario.domingo = form.value.domingo_inicio + '-' + form.value.domingo_fin;

    return this.apiservices.actualizarHorariosNegocio(this.horario).subscribe( (resp: any) => {
      Swal.fire({
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: error.error.error,
        showConfirmButton: false,
        timer: 1500
      });
    });

  }

}
