import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../services/chat.services';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  constructor( private apichatservice: ChatService ) {



  }

  ngOnInit() {

  }

}
