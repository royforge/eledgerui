import { Component, OnInit } from '@angular/core';
import { EledgerApi } from 'src/app/classes/EledgerApi';
import { ActivatedRoute } from '@angular/router';
import { WalletData } from 'src/app/model/walletdata';
import { WALLET } from 'src/app/static/properties';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  walletData: WalletData[];
  newBalance: number;
  customerCount = 0;
  lenderId: string;
  url: string;
  shopName: string;
  constructor(private _eledgerApi: EledgerApi, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lenderId = sessionStorage.getItem('lenderId');
    this.shopName = sessionStorage.getItem('shopName');
    this.url = WALLET + "/lenderId/" + this.lenderId;
    sessionStorage.setItem('lenderId', this.lenderId);
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      data => {
        this.walletData = data["data"];
        this.newBalance = this.walletData.reduce((sum, item) => sum + item.balance, 0);
        this.customerCount = this.walletData.reduce((sum, item) => sum + 1, 0);
      })
  }
  clearData() {
    sessionStorage.clear();
  }
}
