import { Component, OnInit } from '@angular/core';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';
import { UI_URL } from '../static/properties';
import { AlertService } from '../services/alert.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-otpverfication',
  templateUrl: './otpverfication.component.html',
  styleUrls: ['./otpverfication.component.css']
})
export class OtpverficationComponent implements OnInit {

  sessionModel = new SessionModel();
  email: String;
  otp: any;
  isVerified = false;
  password: String;
  confirm_password: String;
  id: any;

  constructor(private notify: AlertService) { }

  ngOnInit(): void {
    this.email = this.sessionModel.getSession(Keys.email);
    this.id = this.sessionModel.getSession(Keys.id);
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  onOtpChange(otp) {
    this.otp = otp;
  }

  onSubmit() {
    if (this.otp != null) {
      if (this.otp != "555555") {
        this.isVerified = true;
      } else {
        this.verify();
      }
    }
  }

  verify() {
    this.sessionModel.setSession(Keys.id, this.id);
    this.notify.showSuccess("OTP Verified", "Successful");
    window.location.href = (UI_URL + "/reset-password");
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
}
