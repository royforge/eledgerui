import { EledgerUser } from 'src/app/classes/EledgerUser';
import { HeaderData } from './../model/headerData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

    this.url = "/lenders";

    //User Management get API to get data of lenders
    this._eledgerUser.getEledgerLenders(this.url).subscribe(resp => {
      this.response = resp["data"]
      for (let lender of this.response) {
        if (lender.lenderId == this.lenderId) {
          this.id = lender.id;
          this.sessionModel.setSession(Keys.id, this.id);
          break;
        }
      }
    });
  }

  //clear the session when user click on yes during logout
  clearData() {
   // this.auth.logOut();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}