import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AddCreditComponent } from './add-credit/add-credit.component';

const routes: Routes = [
  { path: 'addcustomer', component: AddCustomerComponent },
  { path: 'credit', component: AddCreditComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }