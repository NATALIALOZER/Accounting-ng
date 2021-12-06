import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageComponent } from './record-page.component';
import { RecordPageRoutingModule } from './record-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    RecordPageComponent
  ],
  imports: [
    CommonModule,
    RecordPageRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class RecordPageModule { }
