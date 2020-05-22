import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LOGIN_URL } from '../static/properties';


export class User {
  constructor(
    public status: string,
  ) { }

}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient
  ) { }

  authenticate(username, password) {
    return this.httpClient.post<any>(LOGIN_URL, { username, password }).pipe(
      map(
        user => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + user.token;
          sessionStorage.setItem('token', tokenStr);
          return user;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
