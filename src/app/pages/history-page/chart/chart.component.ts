import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICategory, IChartData, IEventInfo } from '../../../shared/models/interfaces';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() public categoriesArray: ICategory[] = [];
  @Input() public data: IEventInfo[] = [];
  public chartData: IChartData[] = [];

  public ngOnInit(): void {
      this.calculateChartData();
      this.getData();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data']) {
      return;
    }
    if (changes['data'].previousValue) {
      if (changes['data'].currentValue.length !== changes['data'].previousValue.length) {
        this.calculateChartData();
        this.getData();
      }
    }
  }

  private getData (): void {
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
        data: this.chartData
      }]
    };
    Highcharts.chart('container', options);
  }

  private calculateChartData(): void {
    this.chartData = [];
    this.categoriesArray.forEach((cat: ICategory) => {
      const catEvent = this.data.filter((e: IEventInfo) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        y: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }
}
