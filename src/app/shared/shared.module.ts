import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatListModule
  ]
  ,
  exports: [
    SidenavComponent
  ]
})
export class SharedModule { }
