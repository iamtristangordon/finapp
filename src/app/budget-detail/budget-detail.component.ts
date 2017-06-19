import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Budget } from '../_models/budget';

import { UserService } from '../_services/user.service';

import 'rxjs/add/operator/switchMap';
 
@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnInit {
  budget: any;

  constructor(
  private userService: UserService,
  private route: ActivatedRoute,
  private location: Location
) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.getBudget(params['id']))
        .subscribe(
          data => {
            console.log(data);
            this.budget = data;
          }
        )
  }

}
