import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {ChatService} from '../../services/chat.services';
import {AuthApiServices} from '../../services/auth.services';
import {Router} from '@angular/router';
import {ApiServices} from '../../services/api.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  notificaciones: any [] = [];
  constructor(config: NgbDropdownConfig,
              private chatservices: ChatService,
              private authservices: AuthApiServices,
              private router: Router,
              private apiservices: ApiServices) {
    config.placement = 'bottom-right';

    this.chatservices.getMessages().subscribe( (resp: any) => {
      this.chatservices.notifaciones.push(resp);
    });
  }

  ngOnInit() {
  }

  mostrar() {
    console.log("si entra aqui");
    this.notificaciones = this.chatservices.notifaciones;
    console.log(this.notificaciones);
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar').classList.toggle('open');
  }

  logOut() {
    this.apiservices.fechas = [];
    this.apiservices.reservaciones = [];
    this.apiservices.numeroComentarios = [];
    this.apiservices.calificaciones = [];
    this.router.navigate(['/login']);
    this.authservices.logOut();
  }

}
