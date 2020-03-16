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

  creditForm = this.fb.group({
    date: [''],
    amount: [NaN, Validators.required],
    due: ['']
  });
  lenderId = sessionStorage.getItem('lenderId');
  borrowerId: string
  walletId: string
  customers: BorrowerData[]
  walletData: WalletData
  borrowerName: string
  borrowerPhone: string
  balance: string
  amount: number

  ngOnInit(): void {

    this.borrowerName = sessionStorage.getItem('name');
    this.borrowerPhone = sessionStorage.getItem('phone');
    this.borrowerId = sessionStorage.getItem('borrowerId');
    this.walletId = sessionStorage.getItem('walletId');
    this.balance = sessionStorage.getItem('amount');
  }

  giveCredit(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var value = target.attributes.value;
    var id = target.attributes.id.nodeValue;
    this.wallet.txnType = value.nodeValue;
    document.getElementById("block").style.border = "2px solid red";
  }
  takeCash(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var value = target.attributes.value;
    var id = target.attributes.id.nodeValue;
    this.wallet.txnType = value.nodeValue;
    document.getElementById("block").style.border = "2px solid green";
  }

  onSubmit() {
    //values
    this.wallet.borrowId = this.borrowerId
    this.wallet.amount = this.creditForm.value.amount
    this.wallet.lenderId = this.lenderId
    this.wallet.walletId = this.walletId
    this.wallet.comment = "Updated Credit Value"

    //updating the Wallet's data to Wallet database
    this.eledgerApi.postEledgerApi(this.wallet).subscribe(resp => {
      console.log(resp.data);
      this.response = resp;
      window.location.href = ("http://localhost:4200/home");
    });
  }
}