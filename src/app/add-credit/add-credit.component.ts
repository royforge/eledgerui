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
    updatedDate: undefined
  };
  response: any;

  creditForm = this.fb.group({
    date: [''],
    amount: [NaN, Validators.required],
    due: ['']
  });
  lenderId = "m1"
  borrowerId: string
  walletId: string
  customers: BorrowerData[]
  walletData: WalletData
  borrowerName: string
  borrowerPhone: string
  balance: number

  ngOnInit(): void {

    this.borrowerName = "Girish";
    this.borrowerPhone = "9461422569"
    this.borrowerId = "32da5275-92c4-442b-81ce-5931421f19cd"

    

    this.eledgerUser.getBorrowers().subscribe(response => {
      this.customers = response
    });


    //get wallet by lenderID and borrowerID
    this.eledgerApi.getEledgerApi("/wallet/lenderId/" + this.lenderId + "/borrowId/" + this.borrowerId).subscribe(data => {
      this.walletData = data["data"]
      console.log(this.walletData.walletId,this.walletData.amount);

     
    });
    //this.walletId = this.walletData.walletId;
    //this.balance = this.walletData.amount;
    
  }

  
 // borrowerName: string = this.customers[0].name
  //borrowerPhone: number = this.customers[0].phone
amount: number
txnType: string
  onSubmit() {

    //values
      this.amount = this.creditForm.value.amount

      

    this.wallet.borrowId = this.borrowerId
    this.wallet.amount = this.amount
    this.wallet.lenderId = this.lenderId

    //updating the Wallet's data to Wallet database
    this.eledgerApi.postEledgerApi(this.wallet).subscribe(resp => {
      console.log(resp.data);
      this.response = resp;
    });
  }

}
