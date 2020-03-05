import { PAYMENTURL } from './../static/properties';
import { EledgerApiService } from './../services/eledgerapi.service';
import { WalletData } from '../model/walletdata';

export class EledgerApi extends EledgerApiService {
    getEledgerApi(customUrl: string) {
        let url = PAYMENTURL + customUrl;
        this.get(url);
    }

    postEledgerApi(walletData: WalletData) {
        this.post(PAYMENTURL, walletData);
    }
}