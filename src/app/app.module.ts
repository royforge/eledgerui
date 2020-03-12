import { EledgerUser } from './classes/EledgerUser';
import { EledgerApi } from './classes/EledgerApi';
import { EledgerApiService } from './services/eledgerapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptorService } from './services/loaderinterceptor.service';
import { AddCreditComponent } from './add-credit/add-credit.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    HomeComponent,
    LoaderComponent,
    AddCreditComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [
    EledgerApiService, EledgerApi, EledgerUser,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
