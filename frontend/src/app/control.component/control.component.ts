import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../websocket.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(private webSocket: WebsocketService) { }

  ngOnInit() {
  }



}
