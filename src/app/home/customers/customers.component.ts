import { UI_URL } from './../../static/properties';
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
import { FormBuilder } from '@angular/forms';
import { UserData } from 'src/app/model/UserData';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  walletData: WalletData[];
  borrowerList: BorrowerData[];
  deleteData: Customers;
  userData: UserData[];
  url: string;
  lenderId: string;
  customers: Customers[] = [];
  public customer = new Customers();
  sessionModel = new SessionModel();
  p: number = 1;
  isSearch = false;
  isReset = false;
  isMobileCustomers = false;
  respDeleteEledgerUser: any;
  respDeleteEledgerApi: any;
  borrower = new BorrowerData();

  constructor(public router: Router, private fb: FormBuilder, private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi, private alertService: AlertService) { }

  ngOnInit(): void {
    //this.myFunction();
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = WALLET + "/lenderId/" + this.lenderId;
    this.getListAtStart();

    if (window.innerWidth <= 768) {
      this.isMobileCustomers = true;
    }
  }

  getListAtStart() {
    this.customers = [];

    //Backend api to get data using lenderId and borrowerId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.walletData = respTrans["data"];

        //Mock API to get the borrower data
        this._eledgerUser.getBorrowers().subscribe(
          respBorrower => {
            this.borrowerList = respBorrower["data"];

            this.walletData.map(wallet => {
              for (let borrorowerData of this.borrowerList) {
                if (borrorowerData.borrowId == wallet.borrowId) {
                  this.setCustomerData(wallet, borrorowerData);
                }
              }
            })
          })
      })
    this.isReset = false;
  }

  private setCustomerData(wallet: WalletData, borrorowerData: BorrowerData) {
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

  onSubmit() {
    //Clear the list of customers first
    this.customers = []
    var byName = (<HTMLInputElement>document.getElementById("name")).value;
    var byPhone = (<HTMLInputElement>document.getElementById("phone")).value;
    var byDebt = (<HTMLInputElement>document.getElementById("txn")).value;

    this._eledgerApi.getEledgerApi(this.url).subscribe(
      resp => {
        this.walletData = resp["data"];
        //Mock API to get the borrower data
        this._eledgerUser.getBorrowers().subscribe(
          respBorrower => {
            this.borrowerList = respBorrower["data"];
            this.walletData.map(wallet => {

              for (let borrorowerData of this.borrowerList) {
                if (wallet.borrowId == borrorowerData.borrowId) {

                  if ((borrorowerData.name.toLowerCase() == byName.toLowerCase() && borrorowerData.lenderId == this.lenderId)
                    || (borrorowerData.phone.toString() == byPhone && borrorowerData.lenderId == this.lenderId)) {
                    this.setCustomerData(wallet, borrorowerData);
                  }

                  //Fetch all the customers with positive value/credit
                  if (byDebt === "Credit" && borrorowerData.lenderId == this.lenderId && wallet.balance >= 0) {
                    this.setCustomerData(wallet, borrorowerData);
                  }
                  //Fetch all the customers with due value/debt
                  if (byDebt === "Due" && borrorowerData.lenderId == this.lenderId && wallet.balance < 0) {
                    this.setCustomerData(wallet, borrorowerData);
                  }
                }
              }
            })
          })
        this.isSearch = true;
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

  deleteCustomer(customerData: Customers) {
    this._eledgerApi.deleteEledgerApi(customerData.walletId).subscribe(
      respEledgeApi => {
        this.respDeleteEledgerApi = respEledgeApi["data"];
      });

    this.borrower.borrowId = customerData.borrowerId;
    this.borrower.lenderId = customerData.lenderId;
    this.borrower.name = customerData.name;
    this.borrower.phone = customerData.phone;
    this.borrower.isDeleted = true;
    this.borrower.id = customerData.id;

    this._eledgerUser.deleteBorrower(customerData.id)
      .subscribe(resp => {
        this.respDeleteEledgerUser = resp["data"];
      });
    window.location.href = (UI_URL + "/home/customers");
  }
}