import { SessionModel } from 'src/app/model/sessionmodel';
import { EledgerUser } from './../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { BorrowerData } from '../model/borrowerData';
import { Keys } from '../model/key';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  id: string;
  response: any;
  sessionModel = new SessionModel();
  borrowerData: BorrowerData;
  borrowerName: string
  borrowerPhone: string
  borrowerId: string;
  lenderId: string;
  customerName: string;
  customerPhone: string;

  borrower: BorrowerData = {
    id: undefined,
    name: undefined,
    borrowId: undefined,
    lenderId: undefined,
    phone: undefined
  }

  constructor(private _eledgerUser: EledgerUser) { }

  ngOnInit(): void {
    this.id = this.sessionModel.getSession(Keys.id);
    this.borrowerName = this.sessionModel.getSession(Keys.name);
    this.borrowerPhone = this.sessionModel.getSession(Keys.phone);
    this.borrowerId = this.sessionModel.getSession(Keys.borrowerId);
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);

    this.customerName = this.borrowerName;
    this.customerPhone = this.borrowerPhone;
  }

  onSubmit() {
    this.borrower.id = this.id;
    this.borrower.borrowId = this.borrowerId;
    this.borrower.lenderId = this.lenderId;
    this.borrower.name = this.customerName;
    this.borrower.phone = this.customerPhone;
    this._eledgerUser.putBorrower(this.borrower)
      .subscribe(resp => {
        this.response = resp;
      });
    this.sessionModel.setSession(Keys.name, this.customerName);
    this.sessionModel.setSession(Keys.phone, this.customerPhone);
    window.location.href = ("http://localhost:4200/credit");
  }
}
