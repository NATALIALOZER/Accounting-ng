import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

const COMPONENTS = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTableModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class MaterialModule { }
