import { AbstractControl } from '@angular/forms';
import { EledgerUser } from '../classes/EledgerUser';




export class MobileValidator {


    
    let mobile = control.value;
    this.eledgerUser.getBorrowers().subscribe(response => {
        this.response = response
        for (let customer of response) {
            console.log(customer);
            if (mobile == customer.phone) {
                console.log("null     - ");
                return { isPresent: true };
            }
        }
    });
    return null;
}
