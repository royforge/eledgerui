import { Keys } from './../model/key';
import { SessionModel } from './../model/sessionmodel';
import { UserData } from './../model/UserData';
import { EledgerUser } from './../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { USERDATA } from './userDataList';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';

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

  constructor(private _eledgerUser: EledgerUser, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.headerData.isHeader = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.isValid = true;
    this.url = "/lenders";

    //User Management get API to get data of lenders
    this._eledgerUser.getEledgerLenders(this.url).subscribe(
      data => {
        this.userData = data["data"];
      })
  }
  userID: string;
  password: string;
  userList = USERDATA;
  isValid: boolean;

  login() {
    const userID = this.userID;
    const password = this.password;
    let check = this.checkValidUser(userID, password);

    if (check) {
      window.location.href = ("http://localhost:4200/home");
    } else {
      this.isValid = false;
    }
  }
  checkValidUser(userID, password): boolean {

    for (let user of this.userData) {
      if (user.phone == userID && user.password == password) {
        this.sessionModel.setSession(Keys.id, user.id);
        this.sessionModel.setSession(Keys.lenderId, user.lenderId);
        this.sessionModel.setSession(Keys.shopName, user.shopName);
        this.sessionModel.setSession(Keys.name, user.name);
        this.sessionModel.setSession(Keys.phone, user.phone);

        return true;
      }
    }
    return false;
  }
}