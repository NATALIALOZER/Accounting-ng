import { Component, Input, OnInit } from '@angular/core';
import { RateApiService } from '../../../shared/services/rate-api.service';
import { rateApiData, rateTableData } from '../../../shared/models/interfaces';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-current-exchange-rate',
  templateUrl: './current-exchange-rate.component.html',
  styleUrls: ['./current-exchange-rate.component.scss']
})
export class CurrentExchangeRateComponent implements OnInit {
  @Input() public resetTableSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public displayedColumns: string[] = ['currency', 'rate', 'date'];
  public dataSource!: rateTableData[];
  public isSubmitted: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private rateApiService: RateApiService
  ) {
  }

  public ngOnInit(): void {
    this.resetTableSubject.subscribe(response => {
      if (response) {
        this.getRate();
      }
    });
  }


  public getRate(): void {
    this.isSubmitted = true;
    setTimeout(() => {
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
      this.isSubmitted = false;
    }, 1000);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
