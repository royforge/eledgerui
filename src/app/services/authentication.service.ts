import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LOGIN_URL } from '../static/properties';

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

  logOut() {
    sessionStorage.removeItem('username')
  }
}
