import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGetService } from "./api-get.service";
import { BehaviorSubject } from 'rxjs';

interface User {
  login: string,
  password: string,
}

interface Authentication {
  success: boolean,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);


  constructor(
    private router: Router,
    private apiGetService: ApiGetService
  ) { }


  login(user: User): void { //TODO

    // return this.apiGetService.http.post(`${this.apiGetService.apiAddress}/auth`, user, this.apiGetService.httpOptions).subscribe((res: Authentication) => {
    //   if(res && res.success) {

    //   }
    // });

    //todo use apiGetService
    // if (username == 'a' && password == 'a') {
    //   sessionStorage.setItem('authenticated', 'true');
    // }
    // else {
    //   sessionStorage.setItem('authenticated', 'false');
    // }
    // return this.authenticated();
  }

  isLoggedIn(): boolean {
    return true; //TODO
  }

  logout(): void {
    sessionStorage.setItem('authenticated', 'false');
    this.router.navigate(["login"]);
  }

  authenticated(): boolean {
    return sessionStorage.getItem('authenticated') === 'true';
  }

}
