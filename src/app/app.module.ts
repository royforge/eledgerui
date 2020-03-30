import { HomeModule } from './home/home.module';
import { EledgerUser } from './classes/EledgerUser';
import { EledgerApi } from './classes/EledgerApi';
import { EledgerApiService } from './services/eledgerapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptorService } from './services/loaderinterceptor.service';
import { AddCreditComponent } from './add-credit/add-credit.component';
import { EledgerLoginComponent } from './eledger-login/eledger-login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { InterceptorService } from './services/interceptor.service';
import { EditmyAccountComponent } from './editmy-account/editmy-account.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    EledgerLoginComponent,
    LoaderComponent,
    AddCreditComponent,
    MyAccountComponent,
    EditmyAccountComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule
  ],
  providers: [
    EledgerApiService, EledgerApi, EledgerUser,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }