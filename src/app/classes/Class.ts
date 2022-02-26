export enum BudgetType{
    'Need', 'Want', 'Savings/Debt'
}


export class Bill{
    name!: string;
    payment!: number;
    dueDate!: Date;
    recurring!: boolean;
    dueDay!: number;
    type!: BudgetType;
}

export class Loan extends Bill{
   balance!: number;
   interest!: number;

}

export class CreditCard extends Loan{
    minimumPayment!: number;
    creditLimit!: number;
}