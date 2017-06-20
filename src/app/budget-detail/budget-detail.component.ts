import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Budget } from '../_models/budget';
import { Expense } from '../_models/expense';

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
  showAdd = false;
  currentUser = JSON.parse(localStorage.currentUser);

  allExpenses: Array<Expense>; 

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
            console.log(data[0].budgets[0]);
            this.budget = data[0].budgets[0];

            this.allExpenses = data[0].budgets[0].expenses;
            console.log(this.allExpenses);
          }
        )
  }

  getExpenses() {
    this.route.params
      .switchMap((params: Params) => this.userService.getBudget(params['id']))
        .subscribe(
          data => {
            this.allExpenses = data[0].budgets[0].expenses;
            console.log(this.allExpenses);
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
    this.showAdd = false;
  }

  deleteExpense(expenseId, budgetId) {
    this.userService.deleteExpense(this.currentUser._id, expenseId, budgetId)
      .subscribe(
        data => {
          this.getExpenses();
        },
        error => {

        }
      );
  }

}
