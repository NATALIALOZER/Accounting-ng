import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IBalance, IBill, ICurrencyInfo, IRateTableData } from '../../../shared/models/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';

@Component({
  selector: 'app-current-account-balance',
  templateUrl: './current-account-balance.component.html',
  styleUrls: ['./current-account-balance.component.scss']
})
export class CurrentAccountBalanceComponent {
  @Input() public data!: IRateTableData[];
}
