import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  }

  login(): void {
    if(this.authenticationService.login(this.username, this.password)) {
      this.storeService.getEnums(); //get enum values once, after log in
      this.router.navigate(["projects"]);
    }
    else {
      alert("Invalid credentials!");
    }
  }

}
