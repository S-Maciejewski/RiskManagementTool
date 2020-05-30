import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
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
  ) { }

  username: string;
  password: string;

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(["projects"]);
      this.storeService.getEnums(); //get enum values once, after log in
    }
  }

  login(): void {
    // TODO: call login function from auth service

    // if (this.authenticationService.isLoggedIn()) {
      // this.router.navigate(["projects"]);
    // }
    // else {
      // alert("Invalid credentials!");
    // }
  }

}
