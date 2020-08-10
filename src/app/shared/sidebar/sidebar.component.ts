import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationStart, Router} from '@angular/router';

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

  constructor(private router: Router) {

    this.email = localStorage.getItem('email');
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/administrador/negocios')
          || (event['url'] == '/administrador/registrarnegocio')
          || (event['url'] == '/administrador/administradores')
          || (event['url'] == `/administrador/negocio/informacion/`)
          || (event['url'] == '/error-pages/404')
          || (event['url'] == '/error-pages/500') ) {

          this.registrarNegocio = true;
          this.administradores = true;
          this.negocios = true;

          this.dashboard = false;
          this.informacion = false;
          this.productos = false;
          this.reservaciones = false;
          this.comentarios = false;
          this.mensajes = false;
          this.eventos = false;
        } else {
          this.registrarNegocio = false;
          this.administradores = false;
          this.negocios = false;

          this.dashboard = true;
          this.informacion = true;
          this.productos = true;
          this.reservaciones = true;
          this.comentarios = true;
          this.mensajes = true;
          this.eventos = true;
        }
      }
    });

    // Spinner for lazyload modules
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
