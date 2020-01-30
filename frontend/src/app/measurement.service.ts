import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private webRequestService: WebRequestService) {}
  getAll() {
    return this.webRequestService.get('measurement');
  }
  getLast() {
    return this.webRequestService.get('measurement/last');
  }
}
