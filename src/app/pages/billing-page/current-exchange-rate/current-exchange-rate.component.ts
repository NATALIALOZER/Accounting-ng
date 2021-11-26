import { Component } from '@angular/core';

export interface IPeriodicElement {
  currency: string;
  position: number;
  rate: number;
  date: string;
}

const ELEMENT_DATA: IPeriodicElement[] = [
  {position: 1, currency: 'Hydrogen', rate: 1.0079, date: 'H'},
  {position: 2, currency: 'Helium', rate: 4.0026, date: 'He'},
  {position: 3, currency: 'Lithium', rate: 6.941, date: 'Li'},
];

@Component({
  selector: 'app-current-exchange-rate',
  templateUrl: './current-exchange-rate.component.html',
  styleUrls: ['./current-exchange-rate.component.scss']
})
export class CurrentExchangeRateComponent {

  public displayedColumns: string[] = ['position', 'currency', 'rate', 'date'];
  public dataSource = ELEMENT_DATA;

}
