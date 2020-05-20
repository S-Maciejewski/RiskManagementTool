import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { ApiGetService } from "./api-get.service";

@Injectable({
  providedIn: 'root'
})

//TODO token authentication and authorization

export class AuthenticationService {

  constructor(
    private router: Router,
    private apiGetService: ApiGetService
    ) { }
    

  login(username: string, password: string): boolean {
    //todo use apiGetService
    if(username == 'a' && password == 'a') {
      sessionStorage.setItem('authenticated', 'true');
    }
    else {
      sessionStorage.setItem('authenticated', 'false');
    }
    return this.authenticated();
  }

  logout(): void {
    sessionStorage.setItem('authenticated', 'false');
    this.router.navigate(["login"]);
  }

  authenticated(): boolean {
    return sessionStorage.getItem('authenticated') === 'true';
  }

}
