import { Data } from './../../model/data';
import { Customers } from './../../model/customers';
import { BorrowerData } from './../../model/borrowerData';
import { EledgerApi } from './../../classes/EledgerApi';
import { EledgerUser } from './../../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { WalletData } from 'src/app/model/walletdata';
import { WALLET } from 'src/app/static/properties';
import { map } from 'rxjs/operators';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Keys } from 'src/app/model/key';

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
  customers: Customers[] = [];
  customer = new Customers();
  sessionModel = new SessionModel();

  constructor(private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = WALLET + "/lenderId/" + this.lenderId;

    this._eledgerUser.getBorrowers().subscribe(
      resp => {
        this.borrowerData = resp;
        let count = 0;
        this.borrowerData.map(borrower => {
          this._eledgerApi.getEledgerApi(this.url + '/borrowId/' + borrower.borrowId).subscribe(
            respTrans => {
              count++;
              this.customer = new Customers();
              this.customer.walletId = respTrans["data"].walletId;
              this.customer.date = respTrans["data"].updatedDate;
              this.customer.amount = respTrans["data"].balance;
              this.customer.name = borrower.name;
              this.customer.phone = borrower.phone;
              this.customer.lenderId = borrower.lenderId;
              this.customer.borrowerId = borrower.borrowId;
              // if (count === (this.borrowerData.length)) {
              //   console.log('List: ', this.customers);
              // }
              this.customers.push(this.customer);
            })
        })
      })
  }

  sendData(data: Customers) {
    this.sessionModel.setSession(Keys.lenderId, this.lenderId);
    this.sessionModel.setSession(Keys.name, data.name);
    this.sessionModel.setSession(Keys.phone, data.phone);
    this.sessionModel.setSession(Keys.amount, data.amount);
    this.sessionModel.setSession(Keys.walletId, data.walletId);
    this.sessionModel.setSession(Keys.borrowerId, data.borrowerId);
  }
}