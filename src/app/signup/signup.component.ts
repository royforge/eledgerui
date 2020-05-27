import { EmailData } from './../model/EmailData';
import { UserData } from 'src/app/model/UserData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EledgerUser } from '../classes/EledgerUser';
import { SessionModel } from '../model/sessionmodel';
import { HeaderData } from '../model/headerData';
import { EledgerApiService } from '../services/eledgerapi.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

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
  sessionModel = new SessionModel();
  headerData = new HeaderData();
  url: string;
  merchant: UserData = {
    id: undefined,
    name: undefined,
    lenderId: undefined,
    phone: undefined,
    email: undefined,
    shopName: undefined,
    password: undefined
  }
  emailData: EmailData = {
    email: undefined,
    name: undefined,
    customerName: undefined
  }

  constructor(private notify: AlertService, private router: Router, private fb: FormBuilder, private eledgerUser: EledgerUser, private service: EledgerApiService) { }

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

  onSubmit() {
    this.isPresentPhone = false;
    this.isPresentEmail = false;
    this.isMatch = false;

    //Assigning form values
    this.name = this.customerForm.value.name;
    this.mobile = this.customerForm.value.mobile;
    this.email = this.customerForm.value.email;
    this.shopName = this.customerForm.value.shopName;
    this.password = this.customerForm.value.password;
    this.confirm_password = this.customerForm.value.confirm_password;

    // validate Password matches the confirm password field
    if (this.password != null && this.confirm_password != null) {
      if (this.password != this.confirm_password) {
        this.isMatch = true;
      } else {
        this.registerNewLender();
      }
    }
  }

  //Method to register new User on Sign Up
  private registerNewLender() {
    this.lenderId = this.name.slice(0, 3) + this.mobile.toString();
    // adding data to the object
    this.shopName[0].toUpperCase();
    this.merchant.name = this.name;
    this.merchant.phone = this.mobile;
    this.merchant.email = this.email;
    this.merchant.shopName = this.shopName;
    this.merchant.password = this.password;
    this.merchant.lenderId = this.lenderId;
    //User Management SignUp Post api to post data to the user database and Register User
    this.eledgerUser.postEledgerSignUp(this.merchant).pipe(first())
      .subscribe(data => {
        this.router.navigateByUrl("/login");
        this.notify.showSuccess("Welcome to Eledger", "Registration Successful");

        //data for Signup Email API
        this.emailData.email = this.email;
        this.emailData.name = this.name;

        //User Management SignUp POST API to send Welcome Email to new user on SignUp
        this.eledgerUser.postSignUpEmail(this.emailData).subscribe();
      },
      //Catch Conflict Error to check If Phone/ EMail is already present
        err => {
          if (err.error.message == "Phone Already Present") {
            this.isPresentPhone = true;
          }
          else if (err.error.message == "EMail Already Present") {
            this.isPresentEmail = true;
          }
        });
  }

  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }
}
