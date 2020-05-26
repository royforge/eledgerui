import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { EledgerUser } from '../classes/EledgerUser';
import { EledgerApiService } from '../services/eledgerapi.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HeaderData } from '../model/headerData';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';
import { UserData } from '../model/UserData';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  sessionModel = new SessionModel();
  headerData = new HeaderData();
  id: string;
  lenderId: string;
  currentPassword: string;
  isMatch = false;
  isCurrentMatch = false;
  confirm_password: any;
  present_password: any;
  new_password: any;
  lender: any;
  // lender: UserData = {
  //   id: undefined,
  //   name: undefined,
  //   shopName: undefined,
  //   lenderId: undefined,
  //   phone: undefined,
  //   password: undefined,
  //   email: undefined
  // }
  response: any;
  url: string;
  user: any;
  isPresentPassword = false;

  constructor(private auth: AuthenticationService, private notify: AlertService, private router: Router,
    private fb: FormBuilder, private eledgerUser: EledgerUser, private service: EledgerApiService) { }

  //validation the form
  customerForm = this.fb.group({
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
    present_password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.headerData.title = "Edit Password";
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.id = this.sessionModel.getSession(Keys.id);
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.currentPassword = this.sessionModel.getSession(Keys.password);
  }

  update() {
    this.new_password = this.customerForm.value.password;
    this.confirm_password = this.customerForm.value.confirm_password;
    this.present_password = this.customerForm.value.present_password;

    if (this.present_password == this.currentPassword) {
      if (this.present_password == this.new_password) {
        this.isCurrentMatch = true;
      }
      else if (this.new_password != this.confirm_password) {
        this.isMatch = true;
      }
      else {
        this.updatePassword();
      }
    }
    else {
      this.isPresentPassword = true;
    }
  }

  updatePassword() {
    this.url = "/userId/" + this.id;

    //User Management Api to get data of lender using userId.
    this.eledgerUser.getEledgerLenders(this.url).subscribe(resp => {
      this.lender = resp["data"]
      this.lender.password = this.new_password;

      //Update lender password post request
      this.eledgerUser.postEledgerLenders(this.lender).subscribe(resp => {
        this.response = resp["data"];
        // sessionStorage.setItem('username', "");
        // sessionStorage.setItem('token', "");
        // //Again authenticating as mobile no(userId for authentication gets changed in updating mobile no.) gets changed.
        // this.auth.authenticate(this.lender.phone, this.lender.password).pipe().subscribe(
        //   resp => {
        //     this.user = resp["data"];
        //     //Session updates
        //     this.sessionModel.setSession(Keys.id, this.user.id);
        //     this.sessionModel.setSession(Keys.lenderId, this.user.lenderId);
        //     this.sessionModel.setSession(Keys.shopName, this.user.shopName);
        //     this.sessionModel.setSession(Keys.name, this.user.name);
        //     this.sessionModel.setSession(Keys.email, this.user.email);
        //     this.sessionModel.setSession(Keys.phone, this.user.phone);
        //     this.notify.showSuccess("Password Updated", "Successful");
        //     this.router.navigateByUrl("/home");
        //   });
        this.notify.showSuccess("Password Updated", "Successful");
        this.router.navigateByUrl("/home");
      });
    });

  }

  //check the form validation
  isValid(control) {
    return this.customerForm.controls[control].invalid && this.customerForm.controls[control].touched;
  }
}
