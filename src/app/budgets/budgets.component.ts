import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

import { Budget } from '../_models/budget';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  model: any = {};
  showAdd = false;
  allBudgets: Array<Budget>;
  currentUser = JSON.parse(localStorage.currentUser);

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getBudgets();
  }

  getBudgets() {
    this.userService.getById(this.currentUser._id)
      .subscribe(
        data => {
            this.allBudgets = data.budgets;
        },
        error => {
            
        });
  }

  createBudget() {
    this.userService.addBudget(this.currentUser._id, this.model)
      .subscribe(
        data => {
          this.getBudgets();
        },
        error => {

        }
      );
    
    this.model = {};
    this.showAdd = false;
  }

  deleteBudget(_id, budgetId) {
    console.log(_id + " " + budgetId);
    this.userService.deleteBudget(_id, budgetId)
      .subscribe(
        data => {
          this.getBudgets();
        },
        error => {

        }
      );
  }

  goToDetail(_id) {
    this.router.navigate(['/detail', _id]);
  }

}
