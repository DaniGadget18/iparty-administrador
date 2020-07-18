import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  intro: HTMLElement;
  wrapper: HTMLElement;
  constructor() {
    this.intro = document.getElementById('body');
    this.intro.classList.add('body-login');
    this.wrapper = document.getElementById('content-wrapper-body');
    this.wrapper.style.background = 'none';
  }

  ngOnInit() {
  }

}
