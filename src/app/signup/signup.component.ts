import { UserData } from 'src/app/model/UserData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EledgerApi } from '../classes/EledgerApi';
import { EledgerUser } from '../classes/EledgerUser';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';

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

  constructor(private fb: FormBuilder,
    private eledgerApi: EledgerApi,
    private eledgerUser: EledgerUser) { }

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
  }

  addMerchant() {
    this.lenderId = this.name.slice(0, 3) + this.mobile.toString();
    // adding data to the object
    this.merchant.name = this.name;
    this.merchant.phone = this.mobile;
    this.merchant.email = this.email;
    this.merchant.shopName = this.shopName;
    this.merchant.password = this.password;
    this.merchant.lenderId = this.lenderId;

    //posting the lender's data to lender.json 
    this.eledgerUser.postLenders(this.merchant)
      .subscribe(respLender => {
        this.response = respLender;
        this.sessionModel.setSession(Keys.lenderId, this.lenderId);
        this.sessionModel.setSession(Keys.shopName, this.shopName);
        this.sessionModel.setSession(Keys.name, this.name);
        this.sessionModel.setSession(Keys.phone, this.mobile);
        window.location.href = ("http://localhost:4200/home");
      });
  }

  onSubmit() {
    this.isPresentPhone = false;
    this.isPresentEmail = false;

    // TODO: Use EventEmitter with form value
    this.name = this.customerForm.value.name;
    this.mobile = this.customerForm.value.mobile;
    this.email = this.customerForm.value.email;
    this.shopName = this.customerForm.value.shopName;
    this.password = this.customerForm.value.password;
    this.confirm_password = this.customerForm.value.confirm_password;

    //checking if mobile number is already present
    this.eledgerUser.getLenders().subscribe(response => {
      this.response = response
      for (let customer of response) {
        if (customer.email == this.email) {
          this.isPresentEmail = true;
          break;
        }
        if (customer.phone == this.mobile) {
          this.isPresentPhone = true;
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
