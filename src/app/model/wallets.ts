

export class Wallet {
    firstName: string;
    lastName: string;
    id: string;
    date: string;
    mail: string; 
}
export const WALLETS: Wallet[] = [
    {
        firstName: "Yotam",
        lastName: "Sher",
        id: "ewallet_d2217a6b7c1085abc7b66aa67047d65a",
        mail: "yotam@sher.com",
    } as Wallet,
    {
        firstName: "Eran",
        lastName: "Vitkon",
        id: "ewallet_c2a4f9b09b9d09660cbf6c46204d1671",
        mail: "eran@vitkon.com",
    } as Wallet,
];


export class Wallets {
    static getWalletId(name: string): Wallet {
        let wallet: Wallet;
        wallet = WALLETS.find(w => w.firstName === name);
        wallet.date = Date.now().toString();
        return wallet;
    }
}