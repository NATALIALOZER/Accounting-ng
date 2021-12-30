import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, map, Subject, takeUntil } from 'rxjs';
import { RateApiService } from '../../shared/services/rate-api.service';
import { IBill, ICurrencyIcons, IRateApiData, IRateTableData } from '../../shared/models/interfaces';
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
  private currencyIcons: ICurrencyIcons[] = [
    {currency: 'EUR', icon : 'euro'},
    {currency: 'USD', icon : 'attach_money'},
    {currency: 'UAH', customIcon : 'uah'}
  ];

  constructor(
    private rateApiService: RateApiService,
    private profileInfoService: DbProfileInfoService
  ) {}

  public ngOnInit(): void {
    this.resetTables();
    this.getData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public resetTables(): void {
    this.loading = true;
    this.getData();
  }

  private getData(): void {
    const balance$ = this.profileInfoService.getUserBalance().pipe(
      map((res: IBill) => this.value = res.value ));
    const rate$ = this.rateApiService.getRate().pipe(
      map( (response: IRateApiData) => {
        this.dataSource = this.currencyIcons.map( (el: any) => {
          const obj: IRateTableData = {
            currency: el.currency,
            rate: response.rates[el.currency],
            date: response.date,
            icon: el.icon,
            balance: this.value * response.rates[el.currency],
            customIcon: el.customIcon};
          return obj;
        });
      })
    );
    const result$ = concat(balance$, rate$);
    result$
      .pipe( takeUntil(this.destroy$))
      .subscribe(() => this.loading = false);
  }
}
