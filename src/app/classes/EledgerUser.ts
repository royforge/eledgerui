import { LENDERURL } from './../static/properties';
import { EledgerApiService } from './../services/eledgerapi.service';

export class EledgerUser extends EledgerApiService {
    getLenders(customUrl: string) {
        let url = LENDERURL + customUrl;
        this.get(url);
    }
}