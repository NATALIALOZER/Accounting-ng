import {NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrlInterceptor } from './shared/interceptors/url.interceptor';
import { environment } from '../environments/environment';
import { AuthGuard } from './shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { EventPageComponent } from './pages/event-page/event-page.component';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: 'HTTP_INTERCEPTORS',
  useClass: UrlInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule
  ],
  providers: [INTERCEPTOR_PROVIDER, { provide: 'BASE_API_URL', useValue: environment.baseUrl }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
