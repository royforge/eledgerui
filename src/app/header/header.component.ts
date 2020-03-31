import { HeaderData } from './../model/headerData';
import { EledgerApiService } from './../services/eledgerapi.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  headerData = new HeaderData();

  subscription: any;
  constructor(private _location: Location, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.headerData.title = 'Eledger';
    this.subscription = this.service.getHeaderChangeEmitter()
      .subscribe(header => this.selectedHeaderItem(header));
  }

  selectedHeaderItem(headerData: HeaderData) {
    this.headerData = headerData;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goBack() {
    this._location.back();
  }
}
