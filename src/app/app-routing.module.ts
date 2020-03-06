import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EledgerLoginComponent } from './eledger-login/eledger-login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: EledgerLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: EledgerLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }