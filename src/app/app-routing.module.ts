import { OtpverficationComponent } from './otpverfication/otpverfication.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EledgerLoginComponent } from './eledger-login/eledger-login.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddCreditComponent } from './add-credit/add-credit.component';
import { HeaderComponent } from './header/header.component';
import { EditmyAccountComponent } from './editmy-account/editmy-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: EledgerLoginComponent },
  { path: 'home', loadChildren : () => import('./home/home.module').then(m=> m.HomeModule) },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'addcustomer', component: AddCustomerComponent },
  { path: 'credit', component: AddCreditComponent },
  { path: 'editcustomer', component: EditCustomerComponent},
  { path: 'header', component:HeaderComponent },
  { path: 'editAccount', component: EditmyAccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'otp-verification', component: OtpverficationComponent },
  { path: '**', component: EledgerLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }