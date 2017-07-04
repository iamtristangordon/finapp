import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../_services/login-status.service';

import { AdminGuard } from '../_guards/admin.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean;

  constructor(
    private loginStatusService: LoginStatusService,
    private adminGuard: AdminGuard) { }

  ngOnInit() {
    this.loginStatusService.sendStatus({status: true});

    this.isAdmin = this.adminGuard.canActivate();
  }

}
