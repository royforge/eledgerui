import { Component, OnInit } from '@angular/core';
import { EledgerUser } from '../classes/EledgerUser';
import { FormBuilder, Validators } from '@angular/forms';
import { BorrowerData } from '../model/borrowerData';
import { EledgerApi } from '../classes/EledgerApi';
import { WalletData } from '../model/walletdata';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent implements OnInit {

  constructor(private fb: FormBuilder, private eledgerUser: EledgerUser, private eledgerApi: EledgerApi) {

  }
  wallet = new WalletData();

  response: any;

  //form values and validation
  creditForm = this.fb.group({
    date: [''],
    amount: [NaN, Validators.required],
    due: ['']
  });
  //set values we need to use
  lenderId = sessionStorage.getItem('lenderId');
  borrowerId: string
  walletId: string
  customers: BorrowerData[]
  walletData: WalletData
  borrowerName: string
  borrowerPhone: string
  balance: string
  amount: number

  selectTxn = false
  isNaN = false

  ngOnInit(): void {
    //update the values from the selected customer session.
    this.borrowerName = sessionStorage.getItem('name');
    this.borrowerPhone = sessionStorage.getItem('phone');
    this.borrowerId = sessionStorage.getItem('borrowerId');
    this.walletId = sessionStorage.getItem('walletId');
    this.balance = sessionStorage.getItem('amount');
  }

  // //click button to set TxnType = Credit
  // giveCredit(event) {
  //   document.getElementById("Credit").classList.remove("highlight");
  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var value = target.attributes.value;
  //   this.wallet.txnType = value.nodeValue;
  //   document.getElementById("Debit").classList.add("highlight");
  // }

  // //click button to set TxnType = Debit
  // takeCash(event) {
  //   document.getElementById("Debit").classList.remove("highlight");
  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var value = target.attributes.value;
  //   this.wallet.txnType = value.nodeValue;
  //   document.getElementById("Credit").classList.add("highlight");
  // }

  //method on form submition
  onSubmit() {
    //values
    this.selectTxn = false;
    this.isNaN = false

    //update values for wallet
    this.wallet.txnType = (<HTMLInputElement>document.getElementById("txnType")).value;
    this.wallet.borrowId = this.borrowerId
    this.wallet.amount = this.creditForm.value.amount
    this.wallet.lenderId = this.lenderId
    this.wallet.walletId = this.walletId
    this.wallet.comment = "Updated Credit Value"

    //check amount input is empty or not
    if (isNaN(this.wallet.amount)) {
      this.isNaN = true
    }

    //Save button works only if txntype has value
    if (this.wallet.txnType == "DEBIT" || this.wallet.txnType == "CREDIT") {
      //updating the Wallet's data to Wallet database
      this.eledgerApi.postEledgerApi(this.wallet).subscribe(resp => {
        this.response = resp;
        window.location.href = ("http://localhost:4200/home");
      });
    } else {
      this.selectTxn = true;
    }
  }

  //Check if values are valid
  isValid(control) {
    return this.creditForm.controls[control].invalid && this.creditForm.controls[control].touched;
  }
}