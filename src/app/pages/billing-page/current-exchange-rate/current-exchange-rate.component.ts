import { Component, Input } from '@angular/core';
import { rateTableData } from '../../../shared/models/interfaces';


@Component({
  selector: 'app-current-exchange-rate',
  templateUrl: './current-exchange-rate.component.html',
  styleUrls: ['./current-exchange-rate.component.scss']
})
export class CurrentExchangeRateComponent {
  @Input() public dataSource: rateTableData[] = [];

  public displayedColumns: string[] = ['currency', 'rate', 'date'];

}
