import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule }   from '@angular/material';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { GoalsComponent } from './goals/goals.component';
import { customHttpProvider } from './_helpers/custom-http';
import { AuthGuard } from './_guards/auth.guard';

import {AuthenticationService } from './_services/authentication.service';
import { LoginStatusService } from './_services/login-status.service';
import {UserService } from './_services/user.service';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent,
    BudgetsComponent,
    GoalsComponent,
    BudgetDetailComponent,
    BackButtonComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    customHttpProvider,
    AuthenticationService,
    UserService,
    LoginStatusService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
