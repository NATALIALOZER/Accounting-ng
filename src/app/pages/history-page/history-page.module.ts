import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';
import { HistoryPageComponent } from './history-page.component';
import { HistoryPageRoutingModule } from './history-page-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HistoryPageComponent,
    ChartComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    HistoryPageRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class HistoryPageModule { }
