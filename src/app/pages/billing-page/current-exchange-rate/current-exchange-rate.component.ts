import { Component, Input } from '@angular/core';
import { RateTableData } from '../../../shared/models/interfaces';


@Component({
  selector: 'app-current-exchange-rate',
  templateUrl: './current-exchange-rate.component.html',
  styleUrls: ['./current-exchange-rate.component.scss']
})
export class CurrentExchangeRateComponent {
  @Input() public dataSource: RateTableData[] = [];
  public displayedColumns: string[] = ['currency', 'rate', 'date'];
}
