import { Component, OnInit } from '@angular/core';
import {MeasurementService} from '../measurement.service';
import { IMeasurment} from '../models/IMeasurment';

@Component({
  selector: 'app-actual-value',
  templateUrl: './actual-value.component.html',
  styleUrls: ['./actual-value.component.scss']
})
export class ActualValueComponent implements OnInit {

  measurement: IMeasurment;

  constructor(private measurementService: MeasurementService) { }

  ngOnInit() {
    this.measurementService.getLast().subscribe((measurement: IMeasurment) => {
      this.measurement = measurement;
      console.log(this.measurement);
    });
  }
}
