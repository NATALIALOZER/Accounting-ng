import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './main-layout/components/header/header.component';
import {SidenavComponent} from './main-layout/components/sidenav/sidenav.component';
import {MaterialModule} from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidenavComponent,
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
  ]
  ,
  exports: [
    SidenavComponent
  ]
})
export class SharedModule { }
