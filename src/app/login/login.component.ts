import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginStatusService } from '../_services/login-status.service';
import { AuthenticationService } from '../_services/authentication.service';
 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private loginStatusService: LoginStatusService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.loginStatusService.sendStatus({status: false});
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
 
    login() {
        this.loading = true;
        this.model.email = this.model.email.toLowerCase();
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }
}
