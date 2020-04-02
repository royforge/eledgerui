import { Transaction } from './../../model/transaction';
import { TRANSACTION } from './../../static/properties';
import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/model/customers';
import { SessionModel } from 'src/app/model/sessionmodel';
import { EledgerUser } from 'src/app/classes/EledgerUser';
import { EledgerApi } from 'src/app/classes/EledgerApi';
import { Keys } from 'src/app/model/key';
import { BorrowerData } from 'src/app/model/borrowerData';
import { Router } from '@angular/router';

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
  searchedCustomers: Customers[];
  customer = new Customers();
  borrowerData: BorrowerData[];
  sessionModel = new SessionModel();
  customerName: string = "";
  customerPhone: string = "";
  txnType: string = "";
  startDate: string = "";
  endDate: string = "";
  isSearch = false;
  isReset = false;
  p: number = 1;

  constructor(public router: Router, private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi) { }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = TRANSACTION + "/lenderId/" + this.lenderId;
    this.getListAtStart();
  }

  getListAtStart() {
    this.customers = [];


    //Backend api to get data using lenderId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.transactions = respTrans["data"];

        //Mock api to get data from borrorer
        this._eledgerUser.getBorrowers().subscribe(
          respCustomer => {
            this.borrowerData = respCustomer;

            this.transactions.map(transaction => {
              this.customerData(transaction);
            })
          })
      })
    this.isReset = false;
  }

  customerData(transaction: Transaction) {
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
  }

  search() {
    this.searchedCustomers = [];
    this.txnType = (<HTMLInputElement>document.getElementById("txnType")).value;

    if (this.txnType != undefined && this.customerName != undefined && this.customerPhone == undefined && this.startDate == undefined && this.endDate == undefined) {
      for (let customer of this.customers) {
        if ((customer.name.toLowerCase() == this.customerName.toLowerCase() || this.customerPhone == customer.phone) && (this.txnType == customer.txnType || (customer.date >= this.startDate && customer.date <= this.endDate))) {
          this.searchedCustomerData(customer);
        }
      }
    } else {
      for (let customer of this.customers) {
        if (customer.name.toLowerCase() == this.customerName.toLowerCase()) {
          this.searchedCustomerData(customer);
        }
        else if (this.customerPhone == customer.phone) {
          this.searchedCustomerData(customer);
        }
        else if (this.txnType == customer.txnType) {
          this.searchedCustomerData(customer);
        }
        else if (customer.date >= this.startDate && customer.date <= this.endDate) {
          this.searchedCustomerData(customer);
        }
        else if ((customer.name.toLowerCase() == this.customerName.toLowerCase() || this.customerPhone == customer.phone) && (this.txnType == customer.txnType || (customer.date >= this.startDate && customer.date <= this.endDate))) {
          this.searchedCustomerData(customer);
        }
      }
    }
    this.isSearch = true;
  }

  searchedCustomerData(customer: Customers) {
    this.customer = new Customers();
    this.customer.name = customer.name;
    this.customer.phone = customer.phone;
    this.customer.amount = customer.amount;
    this.customer.txnType = customer.txnType;
    this.customer.date = customer.date;
    this.searchedCustomers.push(this.customer);
  }

}
