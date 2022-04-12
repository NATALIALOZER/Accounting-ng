import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentExchangeRateComponent } from './current-exchange-rate/current-exchange-rate.component';
import { CurrentAccountBalanceComponent } from './current-account-balance/current-account-balance.component';
import { BillingPageComponent } from './billing-page.component';
import { BillingPageRoutingModule } from './billing-page-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [
    BillingPageComponent,
    CurrentAccountBalanceComponent,
    CurrentExchangeRateComponent
  ],
  imports: [
    CommonModule,
    BillingPageRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class BillingPageModule { }
