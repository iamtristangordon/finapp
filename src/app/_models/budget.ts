import { Expense } from './expense';
import { Income } from './income';

export class Budget {
    _id: string;
    name: string;
    expenses: Array<Expense>;
    income: Array<Income>;
}