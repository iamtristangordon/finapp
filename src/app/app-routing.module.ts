import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent }  from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { GoalsComponent } from './goals/goals.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard] },
    { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: BudgetDetailComponent },
    { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}