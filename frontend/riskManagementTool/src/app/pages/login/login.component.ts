import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from '../../services/authentication.service'
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private storeService: StoreService
  ) {
    this.authenticationService.getToken().subscribe(token => {
      if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(["projects"]);
        this.storeService.getEnums();
      }
    });
  }

  username: string;
  password: string;

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(["projects"]);
      this.storeService.getEnums();
    }
  }

  login(): void {
    let user = { "Username": this.username, "Password": this.password } as User;
    this.authenticationService.login(user);
  }

}
