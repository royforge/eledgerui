import { UserData } from './../model/UserData';
import { LENDERURL, CUSTOMERURL, RELATIONSURL } from './../static/properties';
import { EledgerApiService } from './../services/eledgerapi.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BorrowerData } from '../model/borrowerData';
import { LenderData } from '../model/lenderData';

@Injectable()
export class EledgerUser extends EledgerApiService {

    getLenders(): Observable<any> {
        return this.get(LENDERURL);
    }

    postLenders(userData: UserData): Observable<any> {
        return this.postUser(LENDERURL, userData);
    }
    postBorrower(borrowerData: BorrowerData): Observable<any> {
        return this.postUser(CUSTOMERURL, borrowerData);
    }

    postRelation(any): Observable<any> {
        return this.postUser(RELATIONSURL, any);
    }

    getBorrowers(): Observable<any> {
        return this.get(CUSTOMERURL);
    }

    putLenders(lenderData: LenderData):Observable<any>{
    return this.putUser(LENDERURL+"/"+lenderData.id,lenderData);
    }
    
}