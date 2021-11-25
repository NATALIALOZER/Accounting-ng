import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HomeComponent} from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UrlInterceptor} from './shared/interceptors/url.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {environment} from '../environments/environment';
import {AuthGuard} from './shared/guards/auth.guard';
import {SharedModule} from './shared/shared.module';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: 'HTTP_INTERCEPTORS',
  useClass: UrlInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER, { provide: 'BASE_API_URL', useValue: environment.baseUrl }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
