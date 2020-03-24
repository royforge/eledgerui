import { Keys } from './key';

export class SessionModel {
    getSession(Keys) {
        return sessionStorage.getItem(Keys);
    }
    setSession(key: string, value: any) {
        switch (key) {
            case Keys.lenderId:
                sessionStorage.setItem(key, value);
                break;
            case Keys.shopName:
                sessionStorage.setItem(key, value);
                break;
            case Keys.name:
                sessionStorage.setItem(key, value);
                break;
            case Keys.phone:
                sessionStorage.setItem(key, value);
                break;
            case Keys.amount:
                sessionStorage.setItem(key, value);
                break;
            case Keys.borrowerId:
                sessionStorage.setItem(key, value);
                break;
            case Keys.walletId:
                sessionStorage.setItem(key, value);
                break;
            case Keys.id:
                sessionStorage.setItem(key, value);
                break;
        }
    }
}