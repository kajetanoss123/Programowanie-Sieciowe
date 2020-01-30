import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  subject;
  constructor() {
    this.subject = webSocket('ws://localhost:8080');
    this.subject.subscribe(
        msg => console.log('message received: ' + msg),
        err => console.log(err),
        () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }
  send(value: string) {
    this.subject.next(value);
  }
}
