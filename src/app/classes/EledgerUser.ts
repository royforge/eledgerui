import { EmailData } from './../model/EmailData';
import { BorrowerData } from 'src/app/model/borrowerData';
import { UserData } from './../model/UserData';
import { LENDER_URL, CUSTOMER_URL, RESETPASSWORD_URL, SIGNUP_URL } from './../static/properties';
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

    postResetPasswordEmail(emailData: EmailData): Observable<any> {
        return this.postUser(RESETPASSWORD_URL, emailData);
    }

    postSignUpEmail(emailData: EmailData): Observable<any> {
        return this.postUser(SIGNUP_URL, emailData);
    }

    getAllEledgerCustomers(customUrl: string): Observable<any> {
        let url = CUSTOMER_URL + customUrl;
        return this.get(url);
    }

    postBorrower(borrowerData: BorrowerData): Observable<any> {
        return this.postUser(CUSTOMER_URL, borrowerData);
    }

    getBorrowers(): Observable<any> {
        return this.get(CUSTOMER_URL + "/customers");
    }

    deleteBorrower(id) {
        return this.delete(CUSTOMER_URL + "/customer/" + id);
    }
}