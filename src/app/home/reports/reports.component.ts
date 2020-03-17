import { Transaction } from './../../model/transaction';
import { TRANSACTION } from './../../static/properties';
import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/model/customers';
import { SessionModel } from 'src/app/model/sessionmodel';
import { EledgerUser } from 'src/app/classes/EledgerUser';
import { EledgerApi } from 'src/app/classes/EledgerApi';
import { Keys } from 'src/app/model/key';
import { BorrowerData } from 'src/app/model/borrowerData';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  url: string;
  lenderId: string;
  transactions: Transaction[];
  customers: Customers[] = [];
  customer = new Customers();
  borrowerData: BorrowerData[];
  sessionModel = new SessionModel();
  constructor(private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = TRANSACTION + "/lenderId/" + this.lenderId;

    //Backend api to get data using lenderId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.transactions = respTrans["data"];
        this.transactions.map(transaction => {

          //Mock api to get data from borrorer
          this._eledgerUser.getBorrowers().subscribe(
            respCustomer => {
              this.borrowerData = respCustomer;
              this.customer = new Customers();
              for (let borrower of this.borrowerData) {
                if (transaction.borrowerId == borrower.borrowId) {
                  this.customer.name = borrower.name;
                  this.customer.phone = borrower.phone;
                }
              }
              this.customer.amount = transaction.amount;
              this.customer.txnType = transaction.txnType;
              this.customer.date = transaction.date;
              this.customers.push(this.customer);
            })
        })
      })
  }
}