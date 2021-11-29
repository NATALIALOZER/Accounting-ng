import { Component, Input, OnInit } from '@angular/core';
import { RateApiService } from '../../../shared/services/rate-api.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Balance, rateApiData } from '../../../shared/models/interfaces';

@Component({
  selector: 'app-current-account-balance',
  templateUrl: './current-account-balance.component.html',
  styleUrls: ['./current-account-balance.component.scss']
})
export class CurrentAccountBalanceComponent implements OnInit {
  @Input() public resetTableSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public isSubmitted: boolean = false;
  public balance: Balance = {EUR: 0, USD: 0, UAH: 0};
  private currentBalance: number = 100000;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private rateApiService: RateApiService
  ) { }

  public ngOnInit(): void {
    this.resetTableSubject.subscribe(response => {
      if (response) {
        this.getBalance();
      }
    });
  }

  public getBalance(): void {
    this.isSubmitted = true;
    setTimeout(() => {
      this.rateApiService.getRate()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (response: rateApiData) => {
            this.balance.EUR = response.rates.EUR * this.currentBalance;
            this.balance.USD = response.rates.USD * this.currentBalance;
            this.balance.UAH = response.rates.UAH * this.currentBalance;
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
