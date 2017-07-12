import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AdminGuard implements CanActivate {
 
    constructor() { }
 
    canActivate() {
        let user = JSON.parse(localStorage.getItem('currentUser'));

        if (user.isAdmin) {
            // user is an admin, so return true
            return user.isAdmin;
        }
 
        return user.isAdmin;
    }
}