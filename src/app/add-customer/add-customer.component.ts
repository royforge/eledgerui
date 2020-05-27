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
import { EmailData } from '../model/EmailData';

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
  emailData: EmailData = {
    email: undefined,
    name: undefined,
    customerName: undefined
  }
  response: any;
  headerData = new HeaderData();
  url: string;

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
      for (let customer of response["data"]) {
        if (customer.lenderId == this.wallet.lenderId)
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

  //Method to add customer details to all the required databases
  addCustomer() {
    this.url = "/lenders";
    //User Management Get API to get data 
    this.eledgerUser.getEledgerLenders(this.url).subscribe(
      data => {
        this.response = data["data"]
        for (let lender of this.response) {
          if (lender.lenderId == this.wallet.lenderId) {
            this.emailData.name = lender.name;
            this.emailData.email = lender.email;
            this.emailData.customerName = this.borrowerName;

            // Send Mail to the User about new customer additon
            this.eledgerUser.postAddCustomerEmail(this.emailData).subscribe()
            break;
          }
        }
      });
    //posting the Wallet's data to Wallet database
    this.eledgerApi.postEledgerApi(this.wallet).subscribe(resp => {
      //updating values for the borrower data
      this.borrower.borrowId = resp.data.borrowId;
      this.borrower.name = this.borrowerName;
      this.borrower.lenderId = this.wallet.lenderId;
      this.borrower.phone = this.mobile.toString();
      this.borrower.isDeleted = false;

      //posting the borrower's data to borrower database 
      this.eledgerUser.postBorrower(this.borrower)
        .subscribe(resp => {
          this.notify.showSuccess("Customer Added", "Successful");
          window.location.href = (UI_URL + "/home/customers");
        });
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