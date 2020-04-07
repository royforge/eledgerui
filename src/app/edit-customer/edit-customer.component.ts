import { SessionModel } from 'src/app/model/sessionmodel';
import { EledgerUser } from './../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { BorrowerData } from '../model/borrowerData';
import { Keys } from '../model/key';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  headerData = new HeaderData();
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
    phone: undefined,
    isDeleted: undefined
  }

  constructor(private _eledgerUser: EledgerUser, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.headerData.title = "Edit Customer";
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
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
    this.borrower.isDeleted = false;
    this._eledgerUser.postBorrower(this.borrower)
      .subscribe(resp => {
        this.response = resp["data"];
      });
    this.sessionModel.setSession(Keys.name, this.customerName);
    this.sessionModel.setSession(Keys.phone, this.customerPhone);
    window.location.href = ("http://localhost:4200/home/customers");
  }
}
