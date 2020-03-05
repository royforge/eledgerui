import { Component, OnInit } from '@angular/core';
import { USERDATA } from './userDataList';

@Component({
  selector: 'app-eledger-login',
  templateUrl: './eledger-login.component.html',
  styleUrls: ['./eledger-login.component.css']
})
export class EledgerLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.isValid = true;
  }
    userID : string;
    password : string;
    userList = USERDATA;
    isValid: boolean;

    
  login()
    {
      const userID= this.userID;
      const password= this.password;
      let check = this.checkValidUser(userID,password);

        if(check){
           window.location.href =("https://www.google.com/");
        }else{
          this.isValid = false;
        }
   
    }

    checkValidUser(userID,password):boolean {

      for(let user of this.userList){
        if (user.userId == userID&& user.password == password){
  
          return true;
        }
  
      } 
      return false;
    }

}



