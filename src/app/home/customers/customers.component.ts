import { BorrowerData } from './../../model/borrowerData';
import { EledgerApi } from './../../classes/EledgerApi';
import { EledgerUser } from './../../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { WalletData } from 'src/app/model/walletdata';
import { WALLET } from 'src/app/static/properties';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  walletData: WalletData[];
  borrowerData: BorrowerData[];
  url: string;
  lenderId: string;

  constructor(private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi) { }

  ngOnInit(): void {
    this.lenderId = sessionStorage.getItem('lenderId');
    this.url = WALLET + "/lenderId/" + this.lenderId;

    this._eledgerUser.getBorrowers().subscribe(
      data => {
        this.borrowerData = data;
      }),

      this._eledgerApi.getEledgerApi(this.url).subscribe(
        data => {
          this.walletData = data["data"];
        })
  }
  sendData(borrowerData: BorrowerData) {
    sessionStorage.setItem('lenderId', this.lenderId);
    sessionStorage.setItem('name', borrowerData.name);
    sessionStorage.setItem('phone', borrowerData.phone.toString());
    sessionStorage.setItem('borrowerId', borrowerData.borrowId);
  }
}