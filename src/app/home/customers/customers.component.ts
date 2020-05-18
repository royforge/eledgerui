import { UI_URL } from './../../static/properties';
import { Customers } from './../../model/customers';
import { BorrowerData } from './../../model/borrowerData';
import { EledgerApi } from './../../classes/EledgerApi';
import { EledgerUser } from './../../classes/EledgerUser';
import { Component, OnInit, HostListener } from '@angular/core';
import { WalletData } from 'src/app/model/walletdata';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Keys } from 'src/app/model/key';
import { FormBuilder } from '@angular/forms';
import { UserData } from 'src/app/model/UserData';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  deleteData: Customers;
  url: string;
  lenderId: string;
  customers: Customers[];
  allCustomers: Customers[];

  public customer = new Customers();
  sessionModel = new SessionModel();
  p: number = 1;
  isSearch = false;
  isReset = false;
  respDeleteEledgerUser: any;
  respDeleteEledgerApi: any;
  borrower = new BorrowerData();
  visible = false;

  constructor(private notify: AlertService, public router: Router, private fb: FormBuilder, private _eledgerUser: EledgerUser, private _eledgerApi: EledgerApi) { }

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
    //this.myFunction();
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = "/relation/users/lenderId/" + this.lenderId;
    this.getListAtStart();

    if (window.innerWidth <= 768) {
      this.visible = true;
    }
  }

  getListAtStart() {
    this.customers = [];
    //Backend api to get customers data using lenderId and borrowerId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.customers = respTrans["data"];
        this.isReset = false;
      })
  }

  onSubmit() {
    //Clear the list of customers first
    this.customers = []
    this.p = 1;
    var byName = (<HTMLInputElement>document.getElementById("name")).value;
    var byPhone = (<HTMLInputElement>document.getElementById("phone")).value;
    var byDebt = (<HTMLInputElement>document.getElementById("txn")).value;

    //Backend api to get customers data using lenderId and borrowerId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      resp => {
        this.allCustomers = resp["data"];

        this.allCustomers.map(wallet => {
          //Search by name or phone
          if ((wallet.name.toLowerCase() == byName.toLowerCase() && wallet.lenderId == this.lenderId)
            || (wallet.phone.toString() == byPhone && wallet.lenderId == this.lenderId)) {
            this.setCustomerData(wallet);
          } else if (byDebt === "Credit" && wallet.lenderId == this.lenderId && wallet.amount >= 0) {
            this.setCustomerData(wallet);
            //Search by txnType
          } else if (byDebt === "Due" && wallet.lenderId == this.lenderId && wallet.amount < 0) {
            this.setCustomerData(wallet);
          } else if (((wallet.name.toLowerCase() == byName.toLowerCase() && wallet.lenderId == this.lenderId)
            || (wallet.phone.toString() == byPhone && wallet.lenderId == this.lenderId)) && ((byDebt === "Credit" && wallet.lenderId == this.lenderId && wallet.amount >= 0) || (byDebt === "Due" && wallet.lenderId == this.lenderId && wallet.amount < 0))) {
            this.setCustomerData(wallet);
            //Search by multiple fields
          }
        })
        this.isSearch = true;
      })
  }

  private setCustomerData(wallet: Customers) {
    this.customer = new Customers();
    this.customer.walletId = wallet.walletId;
    this.customer.date = wallet.date;
    this.customer.amount = wallet.amount;
    this.customer.name = wallet.name;
    this.customer.phone = wallet.phone;
    this.customer.lenderId = wallet.lenderId;
    this.customer.borrowerId = wallet.borrowerId;
    this.customer.id = wallet.id;
    this.customers.push(this.customer);
  }

  //set data using session when click on name of the customer
  sendData(data: any) {
    this.sessionModel.setSession(Keys.id, data.id);
    this.sessionModel.setSession(Keys.lenderId, this.lenderId);
    this.sessionModel.setSession(Keys.name, data.name);
    this.sessionModel.setSession(Keys.phone, data.phone);
    this.sessionModel.setSession(Keys.borrowerId, data.borrowId);
    this.sessionModel.setSession(Keys.amount, data.amount);
    this.sessionModel.setSession(Keys.walletId, data.walletId);
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
    this.notify.showWarning('Customer Removed', 'Deleted');
    window.location.href = (UI_URL + "/home/customers");
  }
}