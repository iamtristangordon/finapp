import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { LoginStatusService } from '../_services/login-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  isLogged = false;

  constructor(
    private loginStatusService: LoginStatusService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.loginStatusService.notification.subscribe((res) => {
      if(res.hasOwnProperty('status')) {
        this.isLogged = res.status;
      }
    })
  }

  logout() {
    this.router.navigate(['/login']);

    this.isLogged = false;
  }

}
