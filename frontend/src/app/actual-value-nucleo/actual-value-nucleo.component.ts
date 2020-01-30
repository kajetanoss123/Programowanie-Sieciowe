import { Component, OnInit } from '@angular/core';
import {IMeasurment} from '../models/IMeasurment';
import {WebsocketService} from '../websocket.service';

@Component({
  selector: 'app-actual-value-nucleo',
  templateUrl: './actual-value-nucleo.component.html',
  styleUrls: ['./actual-value-nucleo.component.scss']
})
export class ActualValueNucleoComponent implements OnInit {

  measurement: IMeasurment;

  constructor(private webSocket: WebsocketService) { }

  ngOnInit() {
  }

}
