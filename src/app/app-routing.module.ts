import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(x => x.AuthModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
