import { EledgerUser } from 'src/app/classes/EledgerUser';
import { HeaderData } from './../model/headerData';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';
import { EledgerApiService } from '../services/eledgerapi.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserData } from '../model/UserData';

declare var require: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public LOGO1 = require("./assets/logo1.png");
  public LOGO2 = require("./assets/logo2.png");
  public LOGO3 = require("./assets/logo3.png");
  public LOGO4 = require("./assets/logo4.png");
  lenderId: string;
  shopName: string;
  sessionModel = new SessionModel();
  headerData = new HeaderData();
  id: string;
  response: any;
  url: string;
  currentUser: UserData;
  password: string;

  constructor(private _eledgerUser: EledgerUser, private router: Router, private service: EledgerApiService, private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.shopName = this.sessionModel.getSession(Keys.shopName);
    sessionStorage.setItem('lenderId', this.lenderId);
    this.headerData.title = this.sessionModel.getSession(Keys.shopName);
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.url = "/lenderId/" + this.lenderId;

    //User Management get API to get data of lender using lenderId
    this._eledgerUser.getEledgerLenders(this.url).subscribe(resp => {
      this.response = resp["data"]
      if (this.response.lenderId == this.lenderId) {
        this.id = this.response.id;
        this.sessionModel.setSession(Keys.id, this.id);
        this.password = this.response.password;
      }
    });
  }

  editPassword() {
    this.sessionModel.setSession(Keys.lenderId, this.lenderId);
    this.sessionModel.setSession(Keys.password, this.password);
    this.sessionModel.setSession(Keys.id, this.id);
  }

  //clear the session when user click on yes during logout
  clearData() {
    // this.auth.logOut();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}