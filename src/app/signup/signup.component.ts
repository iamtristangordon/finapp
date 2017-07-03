import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service'; 
import { UserService } from '../_services/user.service';
import { LoginStatusService } from '../_services/login-status.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
 
export class SignupComponent implements OnInit {
    model: any = {}; 
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private loginStatusService: LoginStatusService) { }

    ngOnInit() {
        this.authenticationService.logout();
        this.loginStatusService.sendStatus({status: false});
        
        // get return url from route parameters or default to '/dashboard'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
 
    register() {
        this.loading = true;
        this.model.email = this.model.email.toLowerCase();
        console.log(this.model.email);

        //create the user
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.login();
                },
                error => {
                    //install alert service if contract is extended
                    alert('There was an error signing up');
                    console.log(error);
                });

        this.loading = false;
    }

    login() {
        //log the user in
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    //install alert service if contract is extended
                    alert('There was an error logging in.');
                    console.log(error);
                });
    }
}
