
import { WALLET } from './../static/properties';
import { EledgerApiService } from './../services/eledgerapi.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletData } from './classes/walletdata';
import { EledgerApi } from '../classes/EledgerApi';

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
  newBalance: number;
  customerCount = 0;
  lenderId: string;
  url: string;

  constructor(private _eledgerApi: EledgerApi, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.lenderId = sessionStorage.getItem('lenderId');
    this.url = WALLET + "/lenderId/" + this.lenderId;
    sessionStorage.setItem('lenderId',this.lenderId);
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      data => {
        this.walletData = data["data"];
        this.newBalance = this.walletData.reduce((sum, item) => sum + item.balance, 0);
        this.customerCount = this.walletData.reduce((sum, item) => sum + 1, 0);
      })
      
  }
}
