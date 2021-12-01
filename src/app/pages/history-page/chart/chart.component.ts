import { Component, Input, OnInit } from '@angular/core';
import { EventInfo } from '../../../shared/models/interfaces';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() public data: EventInfo[] = [];

  public ngOnInit(): void {
      this.getData();
  }

  public getData (): void {
    const chartOptions = this.data.filter( (item: EventInfo) =>
        item.type === 'outcome').map( i => { return {name: i.category, y: i.amount}; });
    const options: any = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name} {point.percentage:.1f}%'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            connectorWidth: 0,
            enabled: true,
            format: '{point.name} {point.percentage:.1f} %'
          },
          borderWidth: 0,
          shadow: false,
        }
      },
      series: [{
        name: 'Events',
        colorByPoint: true,
        data: chartOptions
      }]
    };
    Highcharts.chart('container', options);
  }
}
