import { HttpClientModule } from '@angular/common/http';
import { EledgerApiService } from './services/eledgerapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EledgerLoginComponent } from './eledger-login/eledger-login.component';

@NgModule({
  declarations: [
    AppComponent,
    EledgerLoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [EledgerApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
