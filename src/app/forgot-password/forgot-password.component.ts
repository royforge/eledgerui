import { Data } from './../model/data';
import { EmailData } from './../model/EmailData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EledgerUser } from '../classes/EledgerUser';
import { Keys } from '../model/key';
import { SessionModel } from '../model/sessionmodel';
import { AlertService } from '../services/alert.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  response: any;
  email: String;
  isEmailExist = false;
  isPresentEmail = false;
  url: string;
  sessionModel = new SessionModel();
  id: any;
  dataOtp: Data;
  name: string;
  otp: any;

  emailData: EmailData = {
    email: undefined,
    name: undefined,
    customerName: undefined
  }

  constructor(private notify: AlertService, private router: Router, private fb: FormBuilder, private eledgerUser: EledgerUser) { }

  //form Validation
  resetForm = this.fb.group({
    emailId: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.email = this.resetForm.value.emailId;
    this.url = "/validatePhoneOrEmail/" + this.email;

    //User Management Get API to get data 
    this.eledgerUser.getEledgerLenders(this.url).subscribe(
      data => {
        this.response = data["data"]
        if (this.response != null) {
          if (this.response.email == this.email) {
            this.isEmailExist = true;
            this.id = this.response.id;
            this.emailData.email = this.response.email;
            this.emailData.name = this.response.name;
            this.name = this.response.name;
          }
        }

        if (!this.isEmailExist) {
          this.isPresentEmail = true;
        }

        if (this.isEmailExist) {
          this.reset();
        }
      });

    // //User Management Get API to get data 
    // this.eledgerUser.getEledgerLenders(this.url).subscribe(
    //   data => {
    //     this.response = data["data"]
    //     for (let customer of this.response) {
    //       if (customer.email == this.email) {
    //         this.isEmailExist = true;
    //         this.id = customer.id;
    //         this.emailData.email = customer.email;
    //         this.emailData.name = customer.name;
    //         this.name = customer.name;
    //         break;
    //       }
    //     }

    //     if (!this.isEmailExist) {
    //       this.isPresentEmail = true;
    //     }

    //     if (this.isEmailExist) {
    //       this.reset();
    //     }
    //   });
  }

  reset() {
    //post api to send email and name and return encrypted OTP
    this.eledgerUser.postResetPasswordEmail(this.emailData).subscribe(
      resp => {
        this.otp = resp["data"];
        this.notify.showSuccess("Successful", "OTP Sent");
        this.sessionModel.setSession(Keys.id, this.id);
        this.sessionModel.setSession(Keys.email, this.email);
        this.sessionModel.setSession(Keys.otp, this.otp);
        this.sessionModel.setSession(Keys.name, this.name);

        this.router.navigateByUrl("/otp-verification");
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
      });
  }

  //check the form validation
  isValid(control) {
    return this.resetForm.controls[control].invalid && this.resetForm.controls[control].touched;
  }
}
