import { Component, OnInit, HostListener } from '@angular/core';
import { Customers } from 'src/app/model/customers';
import { SessionModel } from 'src/app/model/sessionmodel';
import { EledgerUser } from 'src/app/classes/EledgerUser';
import { EledgerApi } from 'src/app/classes/EledgerApi';
import { Keys } from 'src/app/model/key';
import { Router } from '@angular/router';
import { ReportsData } from 'src/app/model/ReportsData';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  url: string;
  lenderId: string;
  customers: Customers[];
  allCustomers: Customers[];
  customer = new Customers();
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
    if (window.innerWidth <= 767) {
      this.visible = true;
    } else {
      // whenever the window is greater than 767
      this.visible = false;
    }
  }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.getListAtStart();
    if (window.innerWidth <= 767) {
      this.visible = true;
    }

  }

  getListAtStart() {
    this.customers = [];
    this.url = "/relation/allusers/lenderId/" + this.lenderId;

    //Backend api to get data using lenderId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.customers = respTrans["data"];
        this.isReset = false;
      })
  }

  search() {
    this.customers = [];
    this.txnType = (<HTMLInputElement>document.getElementById("txnType")).value;
    this.url = "/relation/allusers/lenderId/" + this.lenderId;
    this.p = 1;
    //Backend api to get data using lenderId
    this._eledgerApi.getEledgerApi(this.url).subscribe(
      respTrans => {
        this.allCustomers = respTrans["data"];


        this.allCustomers.map(report => {
          if (this.txnType != undefined && this.customerName != undefined && this.customerPhone == undefined && this.startDate == undefined && this.endDate == undefined) {
            if ((report.name.toLowerCase() == this.customerName.toLowerCase() || this.customerPhone == report.phone) && (this.txnType == report.txnType || (new Date(report.date) >= new Date(this.startDate) && new Date(report.date) <= new Date(this.endDate)))) {
              this.setCustomerData(report);
            }

          } else {
            if (report.name.toLowerCase() == this.customerName.toLowerCase()) {
              this.setCustomerData(report);
            }
            else if (this.customerPhone == report.phone) {
              this.setCustomerData(report);
            }
            else if (this.txnType == report.txnType) {
              this.setCustomerData(report);
            }
            else if (new Date(report.date) >= new Date(this.startDate) && new Date(report.date) <= new Date(this.endDate)) {
              this.setCustomerData(report);
            }
            else if ((report.name.toLowerCase() == this.customerName.toLowerCase() || this.customerPhone == report.phone) && (this.txnType == report.txnType || (new Date(report.date) >= new Date(this.startDate) && new Date(report.date) <= new Date(this.endDate)))) {
              this.setCustomerData(report);
            }

          }

        })
      })
    this.isSearch = true;
  }


  //Set data from transaction api and borrower api into a single object
  setCustomerData(report: ReportsData) {
    this.customer = new Customers();
    this.customer.name = report.name;
    this.customer.phone = report.phone;
    this.customer.amount = report.amount;
    this.customer.txnType = report.txnType;
    this.customer.date = report.date;
    this.customers.push(this.customer);
  }
}
