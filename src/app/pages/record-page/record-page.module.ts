import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageComponent } from './record-page.component';
import { RecordPageRoutingModule } from './record-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalEditCategoryComponent } from './modal-edit-category/modal-edit-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecordPageComponent,
    ModalEditCategoryComponent
  ],
  imports: [
    CommonModule,
    RecordPageRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecordPageModule { }
