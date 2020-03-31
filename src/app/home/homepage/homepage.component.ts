import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EledgerApi } from 'src/app/classes/EledgerApi';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletData } from 'src/app/model/walletdata';
import { WALLET } from 'src/app/static/properties';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Keys } from 'src/app/model/key';

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
  shopName:string;
  url: string;
  sessionModel = new SessionModel();
  constructor(public router: Router, private _eledgerApi: EledgerApi, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = WALLET + "/lenderId/" + this.lenderId;
    //Backend API to get data using lenderId 
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      data => { 
        this.walletData = data["data"];
        this.newBalance = this.walletData.reduce((sum, item) => sum + item.balance, 0);
        this.customerCount = this.walletData.reduce((sum, item) => sum + 1, 0);
      })
  }
}
