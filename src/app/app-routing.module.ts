import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { EventPageComponent } from './pages/event-page/event-page.component';


const routes: Routes = [
  { path: '', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'billing-page', pathMatch: 'full'},
      { path: 'event/:id' , component: EventPageComponent },
      { path: 'billing-page', loadChildren: () => import('./pages/billing-page/billing-page.module').then(x => x.BillingPageModule)},
      { path: 'history-page', loadChildren: () => import('./pages/history-page/history-page.module').then(x => x.HistoryPageModule)}
    ]},
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(x => x.AuthModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
