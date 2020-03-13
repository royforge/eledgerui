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
  response: any;

  creditForm = this.fb.group({
    date: [''],
    amount: [NaN, Validators.required],
    due: ['']
  });
  lenderId = "m1"
  borrowerId: string
  walletId: number
  customers: BorrowerData[]
  walletData: WalletData
  borrowerName: string
  borrowerPhone: string
  balance: number
  amount: number

  ngOnInit(): void {

    this.borrowerName = sessionStorage.getItem('name');
    this.borrowerPhone = sessionStorage.getItem('phone');
    this.borrowerId = sessionStorage.getItem('borrowerId');

    //get wallet by lenderID and borrowerID
    this.eledgerApi.getEledgerApi("/wallet/lenderId/" + this.lenderId).subscribe(data => {
      this.walletData = data["data"]
      console.log(this.walletData[0].walletId, this.walletData[0].balance, this.walletData[0].borrowId);
      this.walletId = this.walletData[0].walletId
    });
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

    //updating the Wallet's data to Wallet database
    this.eledgerApi.postEledgerApi(this.wallet).subscribe(resp => {
      console.log(resp.data);
      this.response = resp;
    });
  }
}