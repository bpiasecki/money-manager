
export enum WalletItemType {
    Account = 'ACCOUNT',
    Debt = 'DEBT',
    Savings = 'SAVINGS'
}

export const WalletItemTypesList: {name: string; type: WalletItemType}[] = [
    {name: 'Konto', type: WalletItemType.Account},
    {name: 'Dług', type: WalletItemType.Debt},
    {name: 'Oszczędności', type: WalletItemType.Savings}
]