
export enum WalletItemType {
    Account,
    Debt,
    Savings
}

export const WalletItemTypesList: {name: string; type: WalletItemType}[] = [
    {name: 'Konto', type: WalletItemType.Account},
    {name: 'Dług', type: WalletItemType.Debt},
    {name: 'Oszczędności', type: WalletItemType.Savings}
]