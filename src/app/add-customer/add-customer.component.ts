import { Keys } from './../model/key';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { WalletData } from '../model/walletdata';
import { EledgerApi } from '../classes/EledgerApi';
import { EledgerUser } from '../classes/EledgerUser';
import { BorrowerData } from '../model/borrowerData';
import { RelationData } from '../model/relationData';
import { SessionModel } from '../model/sessionmodel';

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
    phone: undefined
  }
  relation: RelationData = {
    borrowId: undefined,
    lenderId: undefined,
  }
  response: any;

  constructor(private fb: FormBuilder,
    private eledgerApi: EledgerApi,
    private eledgerUser: EledgerUser) { }

  //validation the form
  customerForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    amount: [NaN, Validators.required],
    txnType: ['', Validators.required]
  });

  ngOnInit() {

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
      this.borrower.name = this.borrowerName
      this.borrower.lenderId = this.wallet.lenderId
      this.borrower.phone = this.mobile.toString()
     
      //posting the borrower's data to borrower.json 
      this.eledgerUser.postBorrower(this.borrower)
        .subscribe(resp => {
          this.response = resp;
        });

      //updating values for the relation data
      this.relation.lenderId = this.wallet.lenderId
      this.relation.borrowId = resp.data.borrowId
      //posting the relation's data to relation.json 
      this.eledgerUser.postRelation(this.relation)
        .subscribe(resp => {
          this.response = resp;
          window.location.href = ("http://localhost:4200/home");
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
      this.response = response
      for (let customer of response) {
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

  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }

}
