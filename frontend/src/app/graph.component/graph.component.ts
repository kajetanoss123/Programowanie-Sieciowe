import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {MeasurementService} from '../measurement.service';
import {IMeasurment} from '../models/IMeasurment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  measurements: IMeasurment[] = [];
  chartType: ChartType = 'line';
  chartLegend = true;
  chartLabels: Label[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [],
      xAxes: []
    },
    title: {
      display: true,
      fontColor: 'gray',
      fontSize: 30,
      text: 'Programowanie Sieciowe'
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'gray',
        fontSize: 20
      }
    }
  };

  chartData: ChartDataSets[] = [
    { data: [], label: 'temperature'},
    { data: [], label: 'humidity'},
    { data: [], label: 'pressure'},
  ];
  constructor(private measurementService: MeasurementService) { }

  ngOnInit() {
    this.measurementService.getAll().subscribe((measurement: IMeasurment[]) => {
      this.measurements = measurement;
      for (const measure of this.measurements) {
        this.chartLabels.push(new DatePipe('en-US').transform(measure.date, 'short'));
        this.chartData[0].data.push(measure.temperature);
        this.chartData[1].data.push(measure.humidity);
        this.chartData[2].data.push(measure.pressure);
      }
    });
  }

}
