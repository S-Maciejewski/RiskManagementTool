import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGetService } from "./api-get.service";
import { BehaviorSubject } from 'rxjs';

export interface User {
  Username: string,
  Password: string,
}

interface Authentication {
  success: boolean,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);


  constructor(
    private router: Router,
    private apiGetService: ApiGetService
  ) { }


  login(user: User) {
    this.apiGetService.http.post(`${this.apiGetService.apiAddress}User/authenticate`, user, this.apiGetService.httpOptions)
      .subscribe((res: Authentication) => {
        if (res && res.success) {
          this.token.next(res.token);
        }
      });
  }

  isLoggedIn(): boolean {
    return this.token.value !== undefined;
  }

  logout(): void {
    this.token.next(undefined);
    this.router.navigate(["login"]);
  }

  getToken(): BehaviorSubject<string> {
    return this.token;
  }
}
