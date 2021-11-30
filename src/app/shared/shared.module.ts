import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './main-layout/components/header/header.component';
import {SidenavComponent} from './main-layout/components/sidenav/sidenav.component';
import {MaterialModule} from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    SidenavComponent,
    MainLayoutComponent,
    HeaderComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ]
  ,
  exports: [
    SidenavComponent,
    FilterPipe
  ]
})
export class SharedModule { }
