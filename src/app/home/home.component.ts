import { HeaderData } from './../model/headerData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletData } from '../model/walletdata';
import { EledgerApi } from '../classes/EledgerApi';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';
import { Location } from '@angular/common';
import { EledgerApiService } from '../services/eledgerapi.service';

declare var require: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public LOGO1 = require("./assets/logo1.png");
  public LOGO2 = require("./assets/logo2.png");
  public LOGO3 = require("./assets/logo3.png");
  public LOGO4 = require("./assets/logo4.png");
  walletData: WalletData[];
  lenderId: string;
  shopName: string;
  sessionModel = new SessionModel();
  headerData = new HeaderData();
  title: string;

  constructor(private _location: Location, private _eledgerApi: EledgerApi, private route: ActivatedRoute, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.shopName = this.sessionModel.getSession(Keys.shopName);
    sessionStorage.setItem('lenderId', this.lenderId);

    this.headerData.title = this.sessionModel.getSession(Keys.shopName);
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
  }

  //clear the session when user click on yes during logout
  clearData() {
    sessionStorage.clear();
  }

  goBack() {
    this._location.back();
  }

}