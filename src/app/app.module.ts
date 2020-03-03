import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MerchantListService } from './home/service/merchantlist.service';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MerchantListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
