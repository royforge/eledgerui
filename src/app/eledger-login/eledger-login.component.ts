import { UserData } from './../model/UserData';
import { EledgerUser } from './../classes/EledgerUser';
import { Component, OnInit } from '@angular/core';
import { USERDATA } from './userDataList';

@Component({
  selector: 'app-eledger-login',
  templateUrl: './eledger-login.component.html',
  styleUrls: ['./eledger-login.component.css']
})
export class EledgerLoginComponent implements OnInit {

  userData: UserData[];
  user: UserData;
  constructor(private _eledgerUser: EledgerUser) { }

  ngOnInit(): void {
    this.isValid = true;
    this._eledgerUser.getLenders().subscribe(
      data => {
        this.userData = data;
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
        sessionStorage.setItem('lenderId',user.lenderId);
        sessionStorage.setItem('shopName',user.shopName); 
        return true;
      }
    }
    return false;
  }

}



