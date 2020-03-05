import { getTestBed } from '@angular/core/testing';
export class WalletData{
    walletId: number;
    lenderId:string;
    borrowId: string;
    balance: number;
    createdDate: Date;
    updatedDate: Date;
    txnType: string;
    comment: string;
    amount: number;
}