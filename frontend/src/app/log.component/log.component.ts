import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MeasurementService} from '../measurement.service';
import {IMeasurment} from '../models/IMeasurment';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  ambientReading: IMeasurment[] = [];
  displayedColumns: string[] = ['timeStamp', 'temperature', 'humidity', 'pressure'];
  dataSource: MatTableDataSource<IMeasurment>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private measurementService: MeasurementService) {}

  ngOnInit() {
    this.measurementService.getAll().subscribe((measurement: IMeasurment[]) => {
      console.log(measurement);
      this.ambientReading = measurement;
      this.dataSource = new MatTableDataSource<IMeasurment>(measurement);
      this.dataSource.paginator = this.paginator;
    });
  }
}
