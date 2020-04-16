import { UI_URL } from './../static/properties';
import { SessionModel } from 'src/app/model/sessionmodel';
import { EledgerUser } from './../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { BorrowerData } from '../model/borrowerData';
import { Keys } from '../model/key';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

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
  isPresent = false;    //to check is the mobile number (this.mobile) is already added in the cutomer Database 


  borrower: BorrowerData = {
    id: undefined,
    name: undefined,
    borrowId: undefined,
    lenderId: undefined,
    phone: undefined,
    isDeleted: undefined
  }

  constructor(private notify: AlertService, private fb: FormBuilder, private _eledgerUser: EledgerUser, private service: EledgerApiService) { }

  //validation the form
  customerForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required]
  });

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
    this.isPresent = false;
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
    this.notify.showSuccess("Info Updated", "Successful");
    window.location.href = (UI_URL + "/home/customers");
  }

  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }
}
