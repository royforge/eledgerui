import { UI_URL } from './../static/properties';
import { Keys } from './../model/key';
import { SessionModel } from './../model/sessionmodel';
import { UserData } from './../model/UserData';
import { Component, OnInit } from '@angular/core';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eledger-login',
  templateUrl: './eledger-login.component.html',
  styleUrls: ['./eledger-login.component.css']
})
export class EledgerLoginComponent implements OnInit {

  user: UserData;
  sessionModel = new SessionModel();
  headerData = new HeaderData();
  url: string;

  constructor(private notify: AlertService, private router: Router, private service: EledgerApiService, private auth: AuthenticationService) { }

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
    this.auth.authenticate(this.userID, this.password).pipe(first()).subscribe(
      resp => {
        this.user = resp["data"];
        this.sessionModel.setSession(Keys.id, this.user.id);
        this.sessionModel.setSession(Keys.lenderId, this.user.lenderId);
        this.sessionModel.setSession(Keys.shopName, this.user.shopName);
        this.sessionModel.setSession(Keys.name, this.user.name);
        this.sessionModel.setSession(Keys.email, this.user.email);
        this.sessionModel.setSession(Keys.phone, this.user.phone);
        this.name = this.sessionModel.getSession(Keys.name);
        this.notify.showSuccess("Welcome " + this.name, "Successful");
        this.router.navigateByUrl("/home");
      },
      error => {
        if (!this.validated) {
          this.isValid = false;
        }
      }
    )
  }
}