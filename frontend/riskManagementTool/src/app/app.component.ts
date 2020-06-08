import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service'
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public authenticationService: AuthenticationService,
    public storeService: StoreService
  ) {
    // this.storeService.getEnums();
  }

  title = 'riskManagementTool';
}
