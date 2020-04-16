import { UI_URL } from './../static/properties';
import { UserData } from 'src/app/model/UserData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EledgerUser } from '../classes/EledgerUser';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';
import { HeaderData } from '../model/headerData';
import { EledgerApiService } from '../services/eledgerapi.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isPresentPhone = false;    //to check is the mobile number (this.mobile) is already added in the cutomer Database 
  isPresentEmail = false;
  isMatch = false;
  name: string;
  mobile: string;
  email: string;
  shopName: string;
  password: string;
  confirm_password: string;
  lenderId: string;
  response: any;

  merchant: UserData = {
    id: undefined,
    name: undefined,
    lenderId: undefined,
    phone: undefined,
    email: undefined,
    shopName: undefined,
    password: undefined
  }

  sessionModel = new SessionModel();
  headerData = new HeaderData();
  url: string;

  constructor(private notify: AlertService, private fb: FormBuilder, private eledgerUser: EledgerUser, private service: EledgerApiService) { }

  //validation the form
  customerForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    email: ['', Validators.required],
    shopName: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.headerData.isHeader = false;
    this.service.emitHeaderChangeEvent(this.headerData);
  }

  addMerchant() {
    this.lenderId = this.name.slice(0, 3) + this.mobile.toString();
    // adding data to the object
    this.shopName[0].toUpperCase();
    this.merchant.name = this.name;
    this.merchant.phone = this.mobile;
    this.merchant.email = this.email;
    this.merchant.shopName = this.shopName;
    this.merchant.password = this.password;
    this.merchant.lenderId = this.lenderId;

    //User Management Post api to post data to the user database
    this.eledgerUser.postEledgerLenders(this.merchant)
      .subscribe(respLender => {
        this.response = respLender;
        this.sessionModel.setSession(Keys.lenderId, this.lenderId);
        this.sessionModel.setSession(Keys.shopName, this.shopName);
        this.sessionModel.setSession(Keys.name, this.name);
        this.sessionModel.setSession(Keys.phone, this.mobile);
        window.location.href = (UI_URL + "/home");
        this.notify.showSuccess("Welcome to ELedger", "Registration Successful");
      });
  }

  onSubmit() {
    this.isPresentPhone = false;
    this.isPresentEmail = false;
    this.isMatch = false; 

    // TODO: Use EventEmitter with form value
    this.name = this.customerForm.value.name;
    this.mobile = this.customerForm.value.mobile;
    this.email = this.customerForm.value.email;
    this.shopName = this.customerForm.value.shopName;
    this.password = this.customerForm.value.password;
    this.confirm_password = this.customerForm.value.confirm_password;
    this.url = "/lenders";

    //User Management Get API to get data 
    this.eledgerUser.getEledgerLenders(this.url).subscribe(
      data => {
        this.response = data["data"]
        for (let customer of this.response) {
          if (customer.email == this.email && customer.phone == this.mobile) {
            this.isPresentPhone = true;
            this.isPresentEmail = true;
            break;
          }
          else if (customer.email == this.email || customer.phone == this.mobile) {
            if (customer.phone == this.mobile) {
              this.isPresentPhone = true;
              break;
            }
            this.isPresentEmail = true;
            break;
          }
        }

        // validate Password matches the confirm password field
        if (this.password != null && this.confirm_password != null) {
          if (this.password != this.confirm_password) {
            this.isMatch = true;
          }
          else {
            if (!this.isPresentPhone && !this.isPresentEmail) {
              //If mobile is not already present, then add the merchant
              this.addMerchant();
            }
          }
        }
      });
  }

  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }
}
