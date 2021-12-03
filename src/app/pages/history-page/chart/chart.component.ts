import { Component, Input, OnInit } from '@angular/core';
import { ICategory, IEventInfo } from '../../../shared/models/interfaces';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() public categoriesArray: ICategory[] = [];
  @Input() public data: IEventInfo[] = [];

  public ngOnInit(): void {
      this.getData();
  }

  public getData (): void {
    const dataOutcome = this.data.filter( (item: IEventInfo) => item.type === 'outcome');
    const result: {[key: string]: number}  = {};
    const chartOptions = [];
    for (const element of dataOutcome) {
      !result[element.category] ? result[element.category] = element.amount : result[element.category] += element.amount;
    }
    for (const item in result) {
      if (item) {
        chartOptions.push({name: this.getName(+item), y: result[item]});
      }
    }
    const options: any = {
      chart: {
        backgroundColor: 'rgba(0,0,0,0)',
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
            format: '{point.name} {point.percentage:.1f} %',
            color: 'white'
          },
          borderWidth: 0,
          shadow: false,
        }
      },
      series: [{
        name: 'Категория',
        colorByPoint: true,
        data: chartOptions
      }]
    };
    Highcharts.chart('container', options);
  }

  public getName(category: number): string {
    const item = this.categoriesArray.find( i => i.id === category);
    return (item) ? item.name : 'noname';
  }

}
