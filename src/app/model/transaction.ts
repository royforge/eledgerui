export interface Transaction {
    transactionId: number;
    walletId: number;
    lenderId: string;
    date: Date;
    borrowerId: string;
    txnType: string;
    amount: number;
    comment: string;
}
