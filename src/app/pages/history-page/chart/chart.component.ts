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
    const dataOutcome = this.data.filter((item: IEventInfo) => item.type === 'outcome');
    const result: { [key: string]: number } = {};
    const chartOptions = [];
    for (const element of dataOutcome) {
      !result[element.category] ? result[element.category] = element.amount : result[element.category] += element.amount;
    }
    for (const item in result) {
      if (item) {
        chartOptions.push({name: this.getName(+item), y: result[item]});
      }
    }
  }

  public getName(category: number): string {
    const item = this.categoriesArray.find( i => i.id === category);
    return (item) ? item.name : 'noname';
  }

}
