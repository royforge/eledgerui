import { HeaderData } from './../model/headerData';
import { EledgerApiService } from './../services/eledgerapi.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  headerData = new HeaderData();

  subscription: any;
  constructor(private _location: Location, public router: Router, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.headerData.title = 'Eledger';
    this.headerData.isHeader = false;
    this.headerData.isIcon = false;
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

  homeComponent() {
    return (this.router.url === '/home') || (this.router.url ==='/home/reports') || (this.router.url ==='/home/customers');
  }
}
