import { UserData } from 'src/app/model/UserData';
import { Keys } from 'src/app/model/key';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Component, OnInit } from '@angular/core';
import { EledgerUser } from '../classes/EledgerUser';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-editmy-account',
  templateUrl: './editmy-account.component.html',
  styleUrls: ['./editmy-account.component.css']
})
export class EditmyAccountComponent implements OnInit {
  response: any;
  checkResponse: any;
  lenderID: string;
  lenderId: string;
  shopName: string;
  phone: string;
  name: string;
  id: string;
  password: string;
  email: string;
  sessionModel = new SessionModel();
  headerData = new HeaderData();

  newlenderName: string;
  newlenderPhone: string;
  newlenderShopName: string;
  newlenderId: string;
  newpassword: string;
  newlenderEmail: string;

  lender: UserData = {
    id: undefined,
    name: undefined,
    shopName: undefined,
    lenderId: undefined,
    phone: undefined,
    password: undefined,
    email: undefined
  }
  url: string;
  isPresentPhone = false;
  user: UserData;

  constructor(private auth: AuthenticationService, private notify: AlertService, private router: Router,
    private fb: FormBuilder, private eledgerUser: EledgerUser, private service: EledgerApiService) { }

  //validation the form
  customerForm = this.fb.group({
    newlenderName: ['', Validators.required],
    newlenderPhone: ['', Validators.required],
    newlenderShopName: ['', Validators.required],
    newpassword: ['', Validators.required],
    newlenderEmail: ['', Validators.required]
  });

  ngOnInit(): void {
    this.headerData.title = "Edit Account";
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.id = this.sessionModel.getSession(Keys.id);
    this.lenderID = this.sessionModel.getSession(Keys.lenderId);

    this.url = "/lenders";

    //User Management Api to get data of lender.
    this.eledgerUser.getEledgerLenders(this.url).subscribe(resp => {
      this.response = resp["data"]
      for (let lender of this.response) {
        if (lender.lenderId == this.lenderID) {
          this.id = lender.id;
          this.shopName = lender.shopName;
          this.phone = lender.phone;
          this.name = lender.name;
          this.lenderId = lender.lenderId;
          this.password = lender.password;
          this.email = lender.email;

          this.newlenderName = this.name;
          this.newlenderShopName = this.shopName;
          this.newlenderPhone = this.phone;
          this.newpassword = this.password;
          this.newlenderEmail = this.email;
          this.newlenderId = this.lenderId;

          break;
        }
      }
    });
  }

  update() {
    this.url = "/lenders";
    //User Management Get API to get data 
    this.eledgerUser.getEledgerLenders(this.url).subscribe(
      data => {
        this.checkResponse = data["data"]
        for (let customer of this.checkResponse) {
          if (customer.phone == this.newlenderPhone && this.newlenderPhone != this.phone) {
            this.isPresentPhone = true;
            break;
          }
        }
        if (!this.isPresentPhone) {
          this.updateLender();
        }
      });
  }

  updateLender() {
    this.lender.id = this.id;
    this.lender.name = this.newlenderName;
    this.lender.phone = this.newlenderPhone;
    this.lender.shopName = this.newlenderShopName;
    this.lender.lenderId = this.newlenderId;
    this.lender.password = this.newpassword;
    this.lender.email = this.email;

    //Update lender Details post request
    this.eledgerUser.postEledgerLenders(this.lender).subscribe();

    if (this.phone != this.newlenderPhone) {
      sessionStorage.setItem('username', "");
      sessionStorage.setItem('token', "");
      //Again authenticating as mobile no(userId for authentication gets changed in updating mobile no.) gets changed.
      this.auth.authenticate(this.newlenderPhone, this.password).pipe().subscribe(
        resp => {
          this.user = resp["data"];
          //Session updates
          this.sessionModel.setSession(Keys.id, this.user.id);
          this.sessionModel.setSession(Keys.lenderId, this.user.lenderId);
          this.sessionModel.setSession(Keys.shopName, this.user.shopName);
          this.sessionModel.setSession(Keys.name, this.user.name);
          this.sessionModel.setSession(Keys.email, this.user.email);
          this.sessionModel.setSession(Keys.phone, this.user.phone);

          this.notify.showSuccess("Changes Updated", "Successful");
          this.router.navigateByUrl("/myaccount");
        }
      )
    }


    //Catch any error
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        try {
          this.notify.showError(err.error.message, err.status.toString());
        } catch (e) {
          this.notify.showError('An error occurred', '');
        }
        //log error 
      }
      return of(err);
    });
  }

  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }
}

