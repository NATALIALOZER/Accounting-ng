import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecordPageComponent } from './record-page.component';

const routes: Routes = [
  {
    path: '', component: RecordPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordPageRoutingModule { }
