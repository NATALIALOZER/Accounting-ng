import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './history-page.component';
import { EventPageComponent } from '../event-page/event-page.component';


const routes: Routes = [
  {
    path: '', component: HistoryPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryPageRoutingModule { }
