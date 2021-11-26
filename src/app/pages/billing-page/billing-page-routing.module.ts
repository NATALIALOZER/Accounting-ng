import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BillingPageComponent } from './billing-page.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '', component: BillingPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingPageRoutingModule { }
