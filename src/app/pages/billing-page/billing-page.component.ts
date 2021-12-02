import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RateApiService } from '../../shared/services/rate-api.service';
import { IRateApiData, IRateTableData } from '../../shared/models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.scss']
})
export class BillingPageComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public dataSource!: IRateTableData[];
  public currentBalance: number = 0;
  public rate: any;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private rateApiService: RateApiService
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
    this.getRate();
  }

  private getRate(): void {
    this.rateApiService.getRate()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: IRateApiData) => {
          this.dataSource = [
            {currency: 'EUR', rate: response.rates.EUR, date: response.date},
            {currency: 'USD', rate: response.rates.USD, date: response.date},
            {currency: 'UAH', rate: response.rates.UAH, date: response.date}
          ];
          this.rate = response.rates;
          this.loading = false;
        }
      );
  }
}
