import { Observable } from 'rxjs';
import { WalletData } from './classes/walletdata';
import { MerchantListService } from './service/merchantlist.service';
import { Component, OnInit } from '@angular/core';

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
  merchantList: WalletData[];
  newBalance: number;
  customerCount=0;
  constructor(private _merchantlistservice: MerchantListService) { 
  }
  ngOnInit(): void {
    this._merchantlistservice.getWalletByParameter().subscribe(
      data => {
        this.merchantList = data;
        this.newBalance = this.merchantList.reduce((sum, item) => sum + item.balance, 0);
        this.customerCount = this.merchantList.reduce((sum, item) => sum+1, 0);
      })
  }
}
