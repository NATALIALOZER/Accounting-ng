import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './main-layout/components/header/header.component';
import { SidebarComponent } from './main-layout/components/sidebar/sidebar.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalAddEventComponent } from '../pages/record-page/modal-add-event/modal-add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAddCategoryComponent } from '../pages/record-page/modal-add-category/modal-add-category.component';

@NgModule({
  declarations: [
    SidebarComponent,
    MainLayoutComponent,
    HeaderComponent,
    ModalAddEventComponent,
    ModalAddCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
