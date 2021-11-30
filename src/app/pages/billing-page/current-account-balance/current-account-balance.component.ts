import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Bill, CurrencyInfo } from '../../../shared/models/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';

@Component({
  selector: 'app-current-account-balance',
  templateUrl: './current-account-balance.component.html',
  styleUrls: ['./current-account-balance.component.scss']
})
export class CurrentAccountBalanceComponent implements OnInit, OnDestroy {
  @Input() public rate: any;
  @Input() public currentBalance!: number;
  public array: CurrencyInfo[] = [];
  public icons: string[] = [];
  public customIcons: string[] = [];
  public balances: number[] = [];
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private profileInfoService: DbProfileInfoService
  ) {
  }

  public ngOnInit(): void {
    this.getBalance();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private getBalance(): void {
    this.profileInfoService.getUserBalance()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Bill) => {
          this.createArrays(res.value);
        });
  }

  private createArrays(rate: number): void {
    this.array = [
      { currency: 'euro', icon: 'euro', balance: rate * this.rate.EUR, customIcon: '' },
      { currency: 'usd', icon: 'attach_money', balance: rate * this.rate.USD, customIcon: ''},
      { currency: 'uah', icon: '', balance: rate * this.rate.UAH, customIcon: 'uah'}];
    this.icons = this.array.map(elem =>  elem.icon );
    this.customIcons = this.array.map(elem =>  elem.customIcon );
    this.balances = this.array.map( elem => elem.balance);
  }
}
