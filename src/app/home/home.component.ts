import { Component, OnInit } from '@angular/core';

import { LoginStatusService } from '../_services/login-status.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private loginStatusService: LoginStatusService) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.loginStatusService.sendStatus({status: false});
  }

}
