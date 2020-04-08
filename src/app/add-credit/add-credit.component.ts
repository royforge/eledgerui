import { EledgerApiService } from './../services/eledgerapi.service';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Component, OnInit } from '@angular/core';
import { EledgerUser } from '../classes/EledgerUser';
import { FormBuilder, Validators } from '@angular/forms';
import { BorrowerData } from '../model/borrowerData';
import { EledgerApi } from '../classes/EledgerApi';
import { WalletData } from '../model/walletdata';
import { Keys } from '../model/key';
import { HeaderData } from '../model/headerData';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent implements OnInit {
  headerData = new HeaderData();
  constructor(private fb: FormBuilder, private eledgerUser: EledgerUser, private eledgerApi: EledgerApi, private service: EledgerApiService) {

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
  id: string
  selectTxn = false
  isNaN = false
  sessionModel = new SessionModel();

  ngOnInit(): void {
    this.borrowerName = this.sessionModel.getSession(Keys.name);
    this.borrowerPhone = this.sessionModel.getSession(Keys.phone);
    this.borrowerId = this.sessionModel.getSession(Keys.borrowerId);
    this.walletId = this.sessionModel.getSession(Keys.walletId);
    this.balance = this.sessionModel.getSession(Keys.amount);
    this.id = this.sessionModel.getSession(Keys.id);


    this.sessionModel.setSession(Keys.name, this.borrowerName);
    this.sessionModel.setSession(Keys.phone, this.borrowerPhone);
    this.sessionModel.setSession(Keys.borrowerId, this.borrowerId);
    this.sessionModel.setSession(Keys.lenderId, this.lenderId);
    this.sessionModel.setSession(Keys.id, this.id);

    this.headerData.title = sessionStorage.getItem('name');
    this.headerData.name = sessionStorage.getItem('name');
    this.headerData.phone = sessionStorage.getItem('phone');
    this.headerData.amount = sessionStorage.getItem('amount');
    this.headerData.isHeader = true;
    this.headerData.isIcon = true;
    this.service.emitHeaderChangeEvent(this.headerData);
  }

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
    if ((this.wallet.txnType == "DEBIT" || this.wallet.txnType == "CREDIT") && !isNaN(this.wallet.amount)){
      //updating the Wallet's data to Wallet database
      this.eledgerApi.postEledgerApi(this.wallet).subscribe(resp => {
        this.response = resp;
        window.location.href = ("http://localhost:4200/home/customers");
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