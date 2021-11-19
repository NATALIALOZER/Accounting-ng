import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutComponent} from './layout/layout.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
