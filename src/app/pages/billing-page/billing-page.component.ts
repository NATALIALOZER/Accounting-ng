import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Balance, Bill, rateApiData, rateTableData } from '../../shared/models/interfaces';
import { RateApiService } from '../../shared/services/rate-api.service';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.scss']
})
export class BillingPageComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public dataSource!: rateTableData[];
  public currentBalance: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private rateApiService: RateApiService,
    private profileInfoService: DbProfileInfoService
  ) {}

  public ngOnInit(): void {
    this.resetTables();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public resetTables(): void {
    this.loading = true;
    this.getBalance();
    this.getRate();
  }

  private getRate(): void {
    this.rateApiService.getRate()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: rateApiData) => {
          this.dataSource = [
            {currency: 'EUR', rate: response.rates.EUR, date: response.date},
            {currency: 'USD', rate: response.rates.USD, date: response.date},
            {currency: 'UAH', rate: response.rates.UAH, date: response.date}
          ];
        }
      );
  }

  private getBalance(): void {
    this.profileInfoService.getUserBalance()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Bill) => {
          this.currentBalance = res.value;
          this.loading = false;
        }
      );
  }
}
