import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EledgerLoginComponent } from './eledger-login/eledger-login.component';

const routes: Routes = [
  { path: 'login',component:EledgerLoginComponent },
  { path: '**', component:EledgerLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}