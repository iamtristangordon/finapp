import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

import { User } from '../_models/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  allUsers: Array<User>;
  userCount: number;
  userBudgets: number;

  constructor(
    private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(
        data => {
            this.allUsers = data;
            this.userCount = data.length;
            let numBudgets = 0;
            
            //count the number of users that have at least one budget
            data.forEach((currentValue) => {
              if (currentValue.budgets) {
                numBudgets++;
              }
            });

            this.userBudgets = numBudgets;
        },
        error => {
            
        });
  }

}
