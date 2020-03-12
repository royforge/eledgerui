import { UserData } from './../model/UserData';
import { LENDERURL, CUSTOMERURL } from './../static/properties';
import { EledgerApiService } from './../services/eledgerapi.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EledgerUser extends EledgerApiService {

    getLenders(): Observable<any> {
        return this.get(LENDERURL);
    }

    postLenders(userData: UserData): Observable<any> {
        return this.postUser(LENDERURL, userData);
    }

    getBorrowers(): Observable<any> {
        return this.get(CUSTOMERURL);
    }
}