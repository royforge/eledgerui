import { Keys } from './../model/key';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WalletData } from '../model/walletdata';
import { EledgerApi } from '../classes/EledgerApi';
import { EledgerUser } from '../classes/EledgerUser';
import { BorrowerData } from '../model/borrowerData';
import { RelationData } from '../model/relationData';
import { SessionModel } from '../model/sessionmodel';
import { Location } from '@angular/common';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';
import { UI_URL } from '../static/properties';
import { AlertService } from '../services/alert.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  wallet: WalletData = {
    walletId: undefined,
    lenderId: undefined,
    borrowId: undefined,
    amount: undefined,
    txnType: undefined,
    comment: undefined,
    createdDate: undefined,
    updatedDate: undefined,
    balance: undefined
  };
  borrower: BorrowerData = {
    id: undefined,
    name: undefined,
    borrowId: undefined,
    lenderId: undefined,
    phone: undefined,
    isDeleted: undefined
  }
  relation: RelationData = {
    borrowId: undefined,
    lenderId: undefined,
  }
  response: any;
  headerData = new HeaderData();

  constructor(private notify: AlertService, private fb: FormBuilder,
    private eledgerApi: EledgerApi,
    private eledgerUser: EledgerUser,
    private _location: Location,
    private service: EledgerApiService) { }

  //validation the form
  customerForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    amount: [NaN, Validators.required],
    txnType: ['', Validators.required]
  });

  ngOnInit() {
    this.headerData.title = "Add New Customer";
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);

  }

  borrowerName: string;
  mobile: number;
  txn: string;
  balance: number;
  walletData = [];
  sessionModel = new SessionModel();
  isPresent = false;    //to check is the mobile number (this.mobile) is already added in the cutomer Database 

  //Method to add customer details to all the required databases
  addCustomer() {
    //posting the Wallet's data to Wallet database
    this.eledgerApi.postEledgerApi(this.wallet).subscribe(resp => {
      this.response = resp;

      //updating values for the borrower data
      this.borrower.borrowId = resp.data.borrowId;
      this.borrower.name = this.borrowerName;
      this.borrower.lenderId = this.wallet.lenderId;
      this.borrower.phone = this.mobile.toString();
      this.borrower.isDeleted = false;

      //posting the borrower's data to borrower.json 
      this.eledgerUser.postBorrower(this.borrower)
        .subscribe(resp => {
          //this.response = resp;
          this.response = resp["data"];
          this.notify.showSuccess("Customer Added", "Successful");
          window.location.href = (UI_URL + "/home/customers");
        });
    });
  }

  onSubmit() {
    this.isPresent = false;
    // TODO: Use EventEmitter with form value
    this.borrowerName = this.customerForm.value.name;
    this.mobile = this.customerForm.value.mobile;
    this.txn = this.customerForm.value.txnType;
    this.balance = this.customerForm.value.amount;

    //updating values for the Wallet data
    this.wallet.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.wallet.amount = this.balance
    this.wallet.txnType = this.txn
    this.wallet.comment = "Add New Customer"

    //checking if mobile number is already present
    this.eledgerUser.getBorrowers().subscribe(response => {
      // this.response = response
      this.response = response["data"]
      for (let customer of response["data"]) {
        if (customer.phone == this.mobile) {
          this.isPresent = true;
          break;
        }
      }
      if (!this.isPresent) {
        //If mobile is not already present, then add the customer
        this.addCustomer();
      }
    });
  }

  goBack() {
    this._location.back();
  }
  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }

}