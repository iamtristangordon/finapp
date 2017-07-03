import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/user';
import { Budget } from '../_models/budget';
import { Expense } from '../_models/expense';
import { Income } from '../_models/income';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get('/users/' + _id).map((response: Response) => response.json());
    }
 
    create(user: User) {
        console.log(user);
        return this.http.post('/users/register', user);
    }
 
    update(user: User) {
        return this.http.put('/users/' + user._id, user);
    }
 
    delete(_id: string) {
        return this.http.delete('/users/' + _id);
    }

    addBudget(_id: string, budget: Budget) {
        console.log(budget);
        return this.http.post('/users/budget/' + _id, budget);
    }

    deleteBudget(_id: string, budgetId:string) {
        return this.http.delete('/users/budget/' + _id + '/' + budgetId);
    }

    getBudget(_id: string) {
        console.log(_id);
        return this.http.get('/users/budget/' + _id).map((response: Response) => response.json());
    }

    addExpense(_id: string, budgetId:string, expense: Expense) {
        return this.http.post('/users/expense/' + _id + '/' + budgetId, expense);
    }

    deleteExpense(_id: string, budgetId:string, expenseId:string) {
        return this.http.delete('/users/expense/' + _id + '/' + budgetId + '/' + expenseId);
    }

    addIncome(_id: string, budgetId:string, income: Income) {
        return this.http.post('/users/income/' + _id + '/' + budgetId, income);
    }

    deleteIncome(_id: string, budgetId:string, incomeId:string) {
        return this.http.delete('/users/income/' + _id + '/' + budgetId + '/' + incomeId);
    }
    //maybe create feedback model?
    submitFeedback(emailObj) {
        return this.http.post('/users/feedback', emailObj);
    }
}