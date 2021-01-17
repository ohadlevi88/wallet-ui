

export class Wallet {
    firstName: string;
    lastName: string;
    id: string;
    date: string;
    mail: string; 
}
export const WALLETS: Wallet[] = [
    {
        firstName: "Eran",
        lastName: "Vitkon",
        id: "ewallet_c2a4f9b09b9d09660cbf6c46204d1671",
        mail: "eran@vitkon.com",
    } as Wallet,
    {
        firstName: "Yotam",
        lastName: "Sher",
        id: "ewallet_d2217a6b7c1085abc7b66aa67047d65a",
        mail: "yotam@sher.com",
    } as Wallet,
    {
        firstName: "Gilad",
        lastName: "Shoshani",
        id: "ewallet_955323333d29ca1b6295de4aa2eacec3",
        mail: "gilad@shoshani.com",
    } as Wallet,
    {
        firstName: "Ori",
        lastName: "Biron",
        id: "ewallet_69d5d36b8a2b5c7f40d191a93603e6d7",
        mail: "ori@biron.com",
    } as Wallet,
    {
        firstName: "Soli",
        lastName: "Magal",
        id: "ewallet_5a1b0b03492a160311827eaef5baf373",
        mail: "soli@magal.com",
    } as Wallet,
    {
        firstName: "Irina",
        lastName: "Primak",
        id: "ewallet_764fee4f229046a4dfe32fe29671d1d5",
        mail: "irina@primak.com",
    } as Wallet,
    {
        firstName: "Igor",
        lastName: "Korchagin",
        id: "ewallet_8f78441fd432205e30fa25a2e86dcd69",
        mail: "igor@korchagin.com",
    } as Wallet,
    {
        firstName: "Dikla",
        lastName: "Weyl",
        id: "ewallet_b02815c543a34766d7f3adcb102c90a1",
        mail: "dikla@weyl.com",
    } as Wallet,
];


export class Wallets {
    static getWalletId(name: string): Wallet {
        let wallet: Wallet;
        wallet = WALLETS.find(w => w.firstName === name);
        wallet.date = Date.now().toString();
        return wallet;
    }
    static getAllWallets(id: string): Wallet[] {
        return WALLETS.filter(wallet => wallet.id !== id);
    }
}