import { BorrowerData } from 'src/app/model/borrowerData';
import { UserData } from './../model/UserData';
import { CUSTOMERURL, RELATIONSURL, LENDER_URL, CUSTOMER_URL } from './../static/properties';
import { EledgerApiService } from './../services/eledgerapi.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EledgerUser extends EledgerApiService {

    getEledgerLenders(customUrl: string): Observable<any> {
        let url = LENDER_URL + customUrl;
        return this.get(url);
    }

    postEledgerLenders(userData: UserData): Observable<any> {
        return this.postUser(LENDER_URL, userData);
    }

    getAllEledgerCustomers(customUrl: string): Observable<any> {
        let url = CUSTOMER_URL + customUrl;
        return this.get(url);
    }

    // getLenders(): Observable<any> {
    //     return this.get(LENDERURL);
    // }

    // postLenders(userData: UserData): Observable<any> {
    //     return this.postUser(LENDERURL, userData);
    // }

    postBorrower(borrowerData: BorrowerData): Observable<any> {
        return this.postUser(CUSTOMER_URL, borrowerData);
    }

    putBorrower(borrowerData: BorrowerData) {
        return this.putUser(CUSTOMER_URL + "/" + borrowerData.id, borrowerData);
    }

    postRelation(any): Observable<any> {
        return this.postUser(RELATIONSURL, any);
    }

    // getBorrowers(): Observable<any> {
    //     return this.get(CUSTOMER_URL);
    // }
    getBorrowers(): Observable<any> {
        return this.get(CUSTOMER_URL+"/customers");
    }

    // putLenders(lenderData: LenderData):Observable<any>{
    // return this.putUser(LENDERURL+"/"+lenderData.id,lenderData);
    // }

    deleteBorrower(id): Observable<any> {
        return this.delete(CUSTOMER_URL + "/" + id);
    }

}