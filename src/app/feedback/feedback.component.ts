import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model = {};
  formMessage = "";
  showMessage = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  submitFeedback(){
    this.userService.submitFeedback(this.model)
      .subscribe(
        data => {
          if (data.status === 200) {
            this.formMessage = "Message sent.";
            this.showMessage = true;
            this.model = {};

            setTimeout(() => {this.showMessage = false;}, 3000);
          }
          else {
            this.formMessage = "There was an error.";
            this.showMessage = true;
            this.model = {};

            setTimeout(() => {this.showMessage = false;}, 3000);
          }
        }, 
        error => {
          this.formMessage = "There was an error.";
          this.showMessage = true;
          this.model = {};

          setTimeout(() => {this.showMessage = false;}, 3000);
        });
  }

}
