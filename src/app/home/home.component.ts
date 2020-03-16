import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletData } from '../model/walletdata';
import { EledgerApi } from '../classes/EledgerApi';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';

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
  isOn = true;
  sessionModel = new SessionModel();

  constructor(private _eledgerApi: EledgerApi, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.shopName = this.sessionModel.getSession(Keys.shopName);
    sessionStorage.setItem('lenderId', this.lenderId);
  }
  
  //clear the session when user click on yes during logout
  clearData() {
    sessionStorage.clear();
  }
}
