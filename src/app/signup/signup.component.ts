import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service'; 
import { UserService } from '../_services/user.service';
import { LoginStatusService } from '../_services/login-status.service';

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
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private loginStatusService: LoginStatusService) { }

    ngOnInit(): void {
        this.authenticationService.logout();
        this.loginStatusService.sendStatus({status: false});
    
    }
 
    register() {
        this.loading = true;
        this.model.email = this.model.email.toLowerCase();
        console.log(this.model.email);
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
