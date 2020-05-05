import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EledgerUser } from '../classes/EledgerUser';
import { UI_URL } from '../static/properties';
import { Keys } from '../model/key';
import { SessionModel } from '../model/sessionmodel';

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

  constructor(private fb: FormBuilder, private eledgerUser: EledgerUser) { }

  //form Validation
  resetForm = this.fb.group({
    emailId: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.email = this.resetForm.value.emailId;
    this.url = "/lenders";

    //User Management Get API to get data 
    this.eledgerUser.getEledgerLenders(this.url).subscribe(
      data => {
        this.response = data["data"]
        for (let customer of this.response) {
          if (customer.email == this.email) {
            this.isEmailExist = true;
            this.id = customer.id;
            break;
          }
        }

        if (!this.isEmailExist) {
          this.isPresentEmail = true;
        }

        if (this.isEmailExist) {
          this.reset();
        }
      });
  }

  reset() {
    this.sessionModel.setSession(Keys.id, this.id);
    this.sessionModel.setSession(Keys.email, this.email);
    window.location.href = (UI_URL + "/otp-verification");
  }

  //check the form validation
  isValid(control) {
    return this.resetForm.controls[control].invalid && this.resetForm.controls[control].touched;
  }
}
