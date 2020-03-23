export interface Transaction {
    transactionId: number;
    walletId: number;
    lenderId: string;
    date: string;
    borrowerId: string;
    txnType: string;
    amount: number;
    comment: string;
}
