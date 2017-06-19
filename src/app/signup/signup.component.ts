import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

import { Budget } from '../_models/budget';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
 
export class SignupComponent implements OnInit {
    model: any = {}; 
    loading = false;
    budgets: Array<Budget> = [];
 
    constructor(
        public router: Router,
        public userService: UserService) { }

    ngOnInit(): void {
        this.model.budgets = this.budgets;
    }
 
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}
