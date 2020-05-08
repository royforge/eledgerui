import { UI_URL } from './../static/properties';
import { Component, OnInit } from '@angular/core';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';
import { FormBuilder, Validators } from '@angular/forms';
import { EledgerUser } from '../classes/EledgerUser';
import { AlertService } from '../services/alert.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { UserData } from '../model/UserData';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  sessionModel = new SessionModel();
  email: string;
  isMatch = false;
  password: string;
  confirm_password: string;
  id: string;
  url: string;
  response: any;
  responseLender: any;

  constructor(private notify: AlertService, private fb: FormBuilder, private eledgerUser: EledgerUser) { }

  //validation the form
  customerForm = this.fb.group({
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.id = this.sessionModel.getSession(Keys.id);
    console.log(this.id);
  }

  onSubmit() {
    this.password = this.customerForm.value.password;
    this.confirm_password = this.customerForm.value.confirm_password;

    // validate Password matches the confirm password field
    if (this.password != null && this.confirm_password != null) {
      if (this.password != this.confirm_password) {
        this.isMatch = true;
      } else {
        this.reset();
      }
    }
  }

  reset() {
    this.url = "/lenders";

    //User Management Api to get data of lender.
    this.eledgerUser.getEledgerLenders(this.url).subscribe(resp => {
      this.response = resp["data"]
      for (let lender of this.response) {
        if (lender.id == this.id) {
          lender.password = this.password;

          //post API to post new data with new password
          this.eledgerUser.postEledgerLenders(lender).subscribe(respLender => {
            this.responseLender = respLender["data"];
          });
          this.notify.showSuccess("Successful", "Password Reset");
          window.location.href = (UI_URL + "/login");
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
          break;
        }
      }
    });
  }

  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }
}
