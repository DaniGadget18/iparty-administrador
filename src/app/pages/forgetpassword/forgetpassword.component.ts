import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
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
