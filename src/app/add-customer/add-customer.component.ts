import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EledgerApiService } from '../services/eledgerapi.service';
import { WalletData } from '../model/walletdata';

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
    updatedDate: undefined
  };
  response: any;


  constructor(private fb: FormBuilder,
    private eledgerService: EledgerApiService) { }

  customerForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    amount: [NaN, Validators.required],
    txnType: ['', Validators.required]
  });

txn:string;
balance: number;
  ngOnInit() {


  }



  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.customerForm.value);
    this.txn = this.customerForm.value.txnType;
    this.balance = this.customerForm.value.amount;
    this.wallet.lenderId = "m8",
    this.wallet.amount = this.balance,
    this.wallet.txnType = this.txn,
    this.wallet.comment = "Add New Customer"
    this.eledgerService
      .post(this.wallet)
      .subscribe(resp => {
        console.log(resp)
        this.response.push(resp);
      });

  }

}
