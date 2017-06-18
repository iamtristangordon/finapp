import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
 
export class SignupComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService) { }
 
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
