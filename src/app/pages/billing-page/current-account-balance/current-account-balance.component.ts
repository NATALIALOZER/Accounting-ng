import { Component, Input} from '@angular/core';
import { rateTableData } from '../../../shared/models/interfaces';

@Component({
  selector: 'app-current-account-balance',
  templateUrl: './current-account-balance.component.html',
  styleUrls: ['./current-account-balance.component.scss']
})
export class CurrentAccountBalanceComponent {
  @Input() public dataSource: rateTableData[] = [];
  @Input() public currentBalance!: number;
}
