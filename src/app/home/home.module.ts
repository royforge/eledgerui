import { AppComponent } from './../app.component';
import { MerchantListService } from './service/merchantlist.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ],
  providers: [MerchantListService]
})
export class HomeModule { }
