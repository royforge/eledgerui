import { UI_URL } from './../static/properties';
import { Keys } from './../model/key';
import { SessionModel } from './../model/sessionmodel';
import { UserData } from './../model/UserData';
import { EledgerUser } from './../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-eledger-login',
  templateUrl: './eledger-login.component.html',
  styleUrls: ['./eledger-login.component.css']
})
export class EledgerLoginComponent implements OnInit {

  userData: UserData[];
  user: UserData;
  sessionModel = new SessionModel();
  headerData = new HeaderData();
  url: string;

  constructor(private notify: AlertService, private _eledgerUser: EledgerUser, private service: EledgerApiService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.headerData.isHeader = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.isValid = true;
    this.validated = false;
    this.url = "/lenders";
    sessionStorage.clear();

  }
  userID: string;
  password: string;
  isValid: boolean;
  name: string;
  validated: boolean;


  login() {
    //const userID = this.userID;
    //const password = this.password;
    // let check = this.checkValidUser(userID, password);
    this.auth.authenticate(this.userID, this.password).pipe(first()).subscribe(
      data => {
        //User Management get API to get data of lenders
        this._eledgerUser.getEledgerLenders(this.url).subscribe(
          details => {
            this.userData = details["data"];
            this.validated = this.checkValidUser(this.userID, this.password);
            if (this.validated) {
              this.name = this.sessionModel.getSession(Keys.name);
              this.notify.showSuccess("Welcome " + this.name, "Successful");
              window.location.href = (UI_URL + "/home");
            } else {
              sessionStorage.clear();
              this.isValid = false;
            }
          })

      },
      error => {
        if (!this.validated) {
          this.isValid = false;
        }
      }

    )
    // if (check) {
    //   this.name = this.sessionModel.getSession(Keys.name);
    //   this.notify.showSuccess("Welcome " + this.name, "Successful");
    //  // window.location.href = (UI_URL + "/home");
    // } else {
    //   this.isValid = false;
    // }
  }
  checkValidUser(userID, password): boolean {

    for (let user of this.userData) {
      if ((user.phone == userID || user.email == userID) && user.password == password) {
        this.sessionModel.setSession(Keys.id, user.id);
        this.sessionModel.setSession(Keys.lenderId, user.lenderId);
        this.sessionModel.setSession(Keys.shopName, user.shopName);
        this.sessionModel.setSession(Keys.name, user.name);
        this.sessionModel.setSession(Keys.email, user.email);
        this.sessionModel.setSession(Keys.phone, user.phone);
        return true;
      }
    }
    return false;
  }
}