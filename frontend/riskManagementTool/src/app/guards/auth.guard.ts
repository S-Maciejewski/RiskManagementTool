import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService) { }

    canActivate() {
        if (this.authenticationService.isLoggedIn()) {
            return true;
        } else {
            return false;
        }
    }
}