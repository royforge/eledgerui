import { Transaction } from './../../model/transaction';
import { TRANSACTION } from './../../static/properties';
import { Component, OnInit, HostListener } from '@angular/core';
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
  customer = new Customers();
  borrowerData: BorrowerData[];
  sessionModel = new SessionModel();
  customerName: string = "";
  customerPhone: string = "";
  txnType: string = "";
  startDate = new Date();
  endDate = new Date();
  isSearch = false;
  isReset = false;
  visible: boolean = false;
  p: number = 1;

  constructor(public router: Router, private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi) { }

  //onresize event to show or hide filters
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) {
      this.visible = true;
    } else {
      // whenever the window is greater than 768
      this.visible = false;
    }
  }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.getListAtStart();
    if (window.innerWidth <= 768) {
      this.visible = true;
    }

  }

  getListAtStart() {
    this.customers = [];
    this.url = TRANSACTION + "/lenderId/" + this.lenderId;

    //Backend api to get data using lenderId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.transactions = respTrans["data"];
        this.url = "/allcustomers";

        //Mock api to get data from borrorer
        this._eledgerUser.getAllEledgerCustomers(this.url).subscribe(
          respCustomer => {
            this.borrowerData = respCustomer["data"];

            this.transactions.map(transaction => {
              // this.customerData(transaction);
              for (let borrower of this.borrowerData) {
                if (borrower.borrowId == transaction.borrowerId) {
                  this.setCustomerData(transaction, borrower);
                }
              }
            })
          })
      })
    this.isReset = false;
  }

  search() {
    this.customers = [];
    this.txnType = (<HTMLInputElement>document.getElementById("txnType")).value;
    this.url = TRANSACTION + "/lenderId/" + this.lenderId;
    this.p = 1;
    //Backend api to get data using lenderId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.transactions = respTrans["data"];
        this.url = "/allcustomers";

        //Mock api to get data from borrorer
        this._eledgerUser.getAllEledgerCustomers(this.url).subscribe(
          respCustomer => {
            this.borrowerData = respCustomer["data"];
            // this.endDate.setDate(this.endDate.getDate() + (86400000));
            // console.log(this.endDate);

            this.transactions.map(transaction => {
              for (let customer of this.borrowerData) {
                if (transaction.borrowerId == customer.borrowId) {
                  if (this.txnType != undefined && this.customerName != undefined && this.customerPhone == undefined && this.startDate == undefined && this.endDate == undefined) {
                    if ((customer.name.toLowerCase() == this.customerName.toLowerCase() || this.customerPhone == customer.phone) && (this.txnType == transaction.txnType || (new Date(transaction.date) >= new Date(this.startDate) && new Date(transaction.date) <= new Date(this.endDate)))) {
                      this.setCustomerData(transaction, customer);
                    }

                  } else {
                    if (customer.name.toLowerCase() == this.customerName.toLowerCase()) {
                      this.setCustomerData(transaction, customer);
                    }
                    else if (this.customerPhone == customer.phone) {
                      this.setCustomerData(transaction, customer);
                    }
                    else if (this.txnType == transaction.txnType) {
                      this.setCustomerData(transaction, customer);
                    }
                    else if (new Date(transaction.date) >= new Date(this.startDate) && new Date(transaction.date) <= new Date(this.endDate)) {
                      this.setCustomerData(transaction, customer);
                    }
                    else if ((customer.name.toLowerCase() == this.customerName.toLowerCase() || this.customerPhone == customer.phone) && (this.txnType == transaction.txnType || (new Date(transaction.date) >= new Date(this.startDate) && new Date(transaction.date) <= new Date(this.endDate)))) {
                      this.setCustomerData(transaction, customer);
                    }
                  }
                }
              }
            })
          })
        this.isSearch = true;
      })
  }

  //Set data from transaction api and borrower api into a single object
  setCustomerData(transaction: Transaction, borrorower: BorrowerData) {
    this.customer = new Customers();
    this.customer.name = borrorower.name;
    this.customer.phone = borrorower.phone;
    this.customer.amount = transaction.amount;
    this.customer.txnType = transaction.txnType;
    this.customer.date = transaction.date;
    this.customers.push(this.customer);
  }
}
