import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../_services/login-status.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private loginStatusService: LoginStatusService) { }

  ngOnInit() {
    this.loginStatusService.sendStatus({status: true});
  }

}
