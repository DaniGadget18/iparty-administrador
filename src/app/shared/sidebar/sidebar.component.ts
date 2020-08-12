import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationStart, Router} from '@angular/router';
import {AuthApiServices} from '../../services/auth.services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;

  // administrador iParty
  registrarNegocio: boolean;
  administradores: boolean;
  negocios: boolean;

  // Administrador negocio
  dashboard: boolean;
  informacion: boolean;
  productos: boolean;
  reservaciones: boolean;
  comentarios: boolean;
  mensajes: boolean;
  eventos: boolean;
  email: string;

  constructor(private router: Router, private authservices: AuthApiServices) {
    this.email = localStorage.getItem('email');
    this.authservices.checkAuth().subscribe( (resp: any) => {
      if (this.authservices.isAutenticado() && resp.role.role == 'admin') {
        this.dashboard = true;
        this.informacion = true;
        this.productos = true;
        this.reservaciones = true;
        this.comentarios = true;
        this.mensajes = true;
        this.eventos = true;
      } else {
        this.registrarNegocio = true;
        this.administradores = true;
        this.negocios = true;
      }
    });

  }

  ngOnInit() {
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach( (el) =>{
      el.addEventListener('mouseover', () => {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', () => {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}
