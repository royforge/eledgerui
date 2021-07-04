import { EmailData } from './../model/EmailData';
import { BorrowerData } from 'src/app/model/borrowerData';
import { UserData } from './../model/UserData';
import { LENDER_URL, CUSTOMER_URL, RESETPASSWORD_URL, NEW_CUSTOMER_MAIL_URL, SIGNUP_URL, SIGNUP_MAIL_URL } from './../static/properties';
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
    postEledgerSignUp(userData: UserData): Observable<any> {
        return this.postUser(SIGNUP_URL, userData);
    }

    postResetPasswordEmail(emailData: EmailData): Observable<any> {
        return this.postUser(RESETPASSWORD_URL, emailData);
    }

    postAddCustomerEmail(emailData: EmailData): Observable<any> {
        return this.postUser(NEW_CUSTOMER_MAIL_URL, emailData);
    }

    postSignUpEmail(emailData: EmailData): Observable<any> {
        return this.postUser(SIGNUP_MAIL_URL, emailData);
    }

    getAllEledgerCustomers(customUrl: string): Observable<any> {
        let url = CUSTOMER_URL + customUrl;
        return this.get(url);
    }

    postBorrower(borrowerData: BorrowerData): Observable<any> {
        return this.postUser(CUSTOMER_URL, borrowerData);
    }

    getBorrowerById(customUrl: string): Observable<any> {
        let url = CUSTOMER_URL + customUrl;
        return this.get(url);
    }

    deleteBorrower(id) {
        return this.delete(CUSTOMER_URL + "/customer/" + id);
    }
}