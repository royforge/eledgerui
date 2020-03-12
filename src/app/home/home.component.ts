import { WALLET } from './../static/properties';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletData } from '../model/walletdata';
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
  lenderId: string;
  shopName: string;
  isOn = true;

  constructor(private _eledgerApi: EledgerApi, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lenderId = sessionStorage.getItem('lenderId');
    this.shopName = sessionStorage.getItem('shopName');
    sessionStorage.setItem('lenderId', this.lenderId);
  }
  clearData() {
    sessionStorage.clear();
  }
}
