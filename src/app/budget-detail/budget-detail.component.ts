import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Budget } from '../_models/budget';
import { Expense } from '../_models/expense';
import { Income } from '../_models/income';

import { UserService } from '../_services/user.service';

import 'rxjs/add/operator/switchMap';
 
@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnInit {
  budget: any;
  model:any = {};
  modelTwo: any = {};
  total: any;

  showAddExpense = false;
  showAddIncome = false;
  showButtons = true;

  currentUser = JSON.parse(localStorage.currentUser);

  allExpenses: Array<Expense>; 
  allIncome: Array<Income>;

  constructor(
  private userService: UserService,
  private route: ActivatedRoute,
  private location: Location
) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.getBudget(params['id']))
        .subscribe(
          data => {
            this.budget = data[0].budgets[0];

            this.allExpenses = data[0].budgets[0].expenses;
            this.allIncome = data[0].budgets[0].income;

            this.getTotal();
          }
        )
  }

  getExpenses() {
    this.route.params
      .switchMap((params: Params) => this.userService.getBudget(params['id']))
        .subscribe(
          data => {
            this.allExpenses = data[0].budgets[0].expenses;

            this.getTotal();
          }
        )
  }

  getIncome() {
    this.route.params
      .switchMap((params: Params) => this.userService.getBudget(params['id']))
        .subscribe(
          data => {
            this.allIncome = data[0].budgets[0].income;

            this.getTotal();
          }
          
        )
  }

  addExpense() {
    this.route.params
      .switchMap((params: Params) => this.userService.addExpense(this.currentUser._id,params['id'], this.model))
      .subscribe(
        data => {
          this.getExpenses();
        },
        error => {

        }
      );
    
    this.model = {};
    this.showAddExpense = false;
    this.showButtons = true;
  }

  addIncome() {
    this.route.params
      .switchMap((params: Params) => this.userService.addIncome(this.currentUser._id,params['id'], this.modelTwo))
      .subscribe(
        data => {
          this.getIncome();
        },
        error => {

        }
      );
    
    this.modelTwo = {};
    this.showAddIncome = false;
    this.showButtons = true;
  }

  deleteExpense(expenseId, budgetId) {
    this.userService.deleteExpense(this.currentUser._id, budgetId, expenseId)
      .subscribe(
        data => {
          this.getExpenses();
        },
        error => {

        }
      );
  }

  deleteIncome(incomeId, budgetId) {
    this.userService.deleteIncome(this.currentUser._id, budgetId, incomeId)
      .subscribe(
        data => {
          this.getIncome();
        },
        error => {

        }
      );
  }

  getTotal() {
    this.route.params
      .switchMap((params: Params) => this.userService.getBudget(params['id']))
        .subscribe(
          data => {
            let expenseAmounts = [];
            let incomeAmounts = [];

            this.allIncome.forEach(function(currentValue, index, array){
              incomeAmounts.push(Number(currentValue.amount));
            });

            this.allExpenses.forEach(function(currentValue, index, array){
              expenseAmounts.push(Number("-" + currentValue.amount));
            });

            let expenseNumber = 0;
            let incomeNumber = 0;

            expenseAmounts.forEach(function(value){
              expenseNumber += value;
            });

            incomeAmounts.forEach(function(value){
              incomeNumber += value;
            });

            console.log(expenseNumber);
            console.log(incomeNumber);

            this.total = expenseNumber + incomeNumber;

            console.log(this.total);
          }
        )
  }

}
