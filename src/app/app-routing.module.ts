import { HeaderComponent } from './header/header.component';
import { EditmyAccountComponent } from './editmy-account/editmy-account.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EledgerLoginComponent } from './eledger-login/eledger-login.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { HomeComponent } from './home/home.component';
import { AddCreditComponent } from './add-credit/add-credit.component';

const routes: Routes = [
  { path: 'login', component: EledgerLoginComponent },
  { path: 'header', component:HeaderComponent },
  { path: 'editAccount', component: EditmyAccountComponent },
  { path: 'home', component: HomeComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'addcustomer', component: AddCustomerComponent },
  { path: 'credit', component: AddCreditComponent },
  { path: '**', component: EledgerLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }