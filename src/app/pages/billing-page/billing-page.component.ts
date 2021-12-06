import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RateApiService } from '../../shared/services/rate-api.service';
import { IBill, IRateApiData, IRateTableData } from '../../shared/models/interfaces';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.scss']
})
export class BillingPageComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public dataSource!: IRateTableData[];
  public value: number = 0;
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
    setTimeout(() => {
      this.getRate();
    }, 500);
  }

  private getBalance(): void {
    this.profileInfoService.getUserBalance()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: IBill) => {
          this.value = res.value;
          this.loading = false;
        });
  }

  private getRate(): void {
    this.rateApiService.getRate()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: IRateApiData) => {
          this.dataSource = [
            {
              currency: 'EUR', rate: response.rates.EUR, date: response.date, icon: 'euro',
              balance: this.value * response.rates.EUR, customIcon: ''},
            {
              currency: 'USD', rate: response.rates.USD, date: response.date, icon: 'attach_money',
              balance: this.value * response.rates.USD, customIcon: ''
            },
            {
              currency: 'UAH', rate: response.rates.UAH, date: response.date, icon: '',
              balance: this.value * response.rates.UAH, customIcon: 'uah'},
          ];
        }
      );
  }
}
