import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service'
import { StoreService } from './services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public authenticationService: AuthenticationService,
    public storeService: StoreService, 
    private router: Router
  ) {
    // this.storeService.getEnums();
  }

  title = 'riskManagementTool';

  openProjectsView(){
    this.router.navigate(['projects']);
  }
}
