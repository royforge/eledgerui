import { Customers } from './../../model/customers';
import { BorrowerData } from './../../model/borrowerData';
import { EledgerApi } from './../../classes/EledgerApi';
import { EledgerUser } from './../../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { WalletData } from 'src/app/model/walletdata';
import { WALLET } from 'src/app/static/properties';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Keys } from 'src/app/model/key';
import { AlertService } from 'src/app/services/alert.service'
import { from } from 'rxjs';
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

  constructor(private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi, private alertService: AlertService) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = WALLET + "/lenderId/" + this.lenderId;

    //Mock API to get the borrower data
    this._eledgerUser.getBorrowers().subscribe(
      resp => {
        this.borrowerData = resp;
        let count = 0;
        this.borrowerData.map(borrower => {
          if (borrower.lenderId == this.lenderId) {

            //Backend api to get data using lenderId and borrowerId
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
                this.customers.push(this.customer);
              })
          }
        })
      })
  }

  //set data using session when click on name of the customer
  sendData(data: Customers) {
    this.sessionModel.setSession(Keys.lenderId, this.lenderId);
    this.sessionModel.setSession(Keys.name, data.name);
    this.sessionModel.setSession(Keys.phone, data.phone);
    this.sessionModel.setSession(Keys.amount, data.amount);
    this.sessionModel.setSession(Keys.walletId, data.walletId);
    this.sessionModel.setSession(Keys.borrowerId, data.borrowerId);
  }
}