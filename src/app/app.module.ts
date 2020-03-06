import { EledgerUser } from './classes/EledgerUser';
import { EledgerApi } from './classes/EledgerApi';
import { HttpClientModule } from '@angular/common/http';
import { EledgerApiService } from './services/eledgerapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [EledgerApiService,EledgerApi, EledgerUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
