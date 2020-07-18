import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  fondo: HTMLElement;
  constructor() {
    this.fondo = document.getElementById('body');
    this.fondo.style.background = '#f2edf3';
  }

  ngOnInit() {
  }

}
