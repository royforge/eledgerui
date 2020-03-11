import { EledgerUser } from './classes/EledgerUser';
import { EledgerApi } from './classes/EledgerApi';
import { HttpClientModule } from '@angular/common/http';
import { EledgerApiService } from './services/eledgerapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [EledgerApiService,EledgerApi, EledgerUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
