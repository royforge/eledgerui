import { Customers } from './../../model/customers';
import { BorrowerData } from './../../model/borrowerData';
import { EledgerApi } from './../../classes/EledgerApi';
import { EledgerUser } from './../../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { WalletData } from 'src/app/model/walletdata';
import { WALLET } from 'src/app/static/properties';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Keys } from 'src/app/model/key';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  walletData: WalletData[];
  borrowerList: BorrowerData[];
  url: string;
  lenderId: string;
  customers: Customers[] = [];
  customer = new Customers();
  sessionModel = new SessionModel();

  constructor(private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = WALLET + "/lenderId/" + this.lenderId;

    //Backend api to get data using lenderId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.walletData = respTrans["data"];
      })

    //Mock API to get the borrower data
    this._eledgerUser.getBorrowers().subscribe(
      respBorrower => {
        this.borrowerList = respBorrower;

        //Map function to get the combined data from both backend api and mock user api
        this.walletData.map(wallet => {
          for (let borrorowerData of this.borrowerList) {
            if (borrorowerData.borrowId == wallet.borrowId) {
              this.customer = new Customers();
              this.customer.walletId = wallet.walletId;
              this.customer.date = wallet.updatedDate;
              this.customer.amount = wallet.balance;
              this.customer.name = borrorowerData.name;
              this.customer.phone = borrorowerData.phone;
              this.customer.lenderId = borrorowerData.lenderId;
              this.customer.borrowerId = borrorowerData.borrowId;
              this.customer.id = borrorowerData.id;
              this.customers.push(this.customer);
            }
          }
        })
      })
  }
  //set data using session when click on name of the customer
  sendData(data: Customers) {
    this.sessionModel.setSession(Keys.id, data.id);
    this.sessionModel.setSession(Keys.lenderId, this.lenderId);
    this.sessionModel.setSession(Keys.name, data.name);
    this.sessionModel.setSession(Keys.phone, data.phone);
    this.sessionModel.setSession(Keys.amount, data.amount);
    this.sessionModel.setSession(Keys.walletId, data.walletId);
    this.sessionModel.setSession(Keys.borrowerId, data.borrowerId);
  }
}