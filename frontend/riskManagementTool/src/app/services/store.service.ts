import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";


// Service for storing common immutable data (i.e. database enums)
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private apiGetService: ApiGetService) { }

  public impacts: object;

  getEnums() {
    this.fetchImpacts();
    //todo severity, probability
  }

  fetchImpacts() {
    //todo real endpoint url
    this.apiGetService.get('http://www.mocky.io/v2/5ecdb6943000006800ea0be6').subscribe( res => {
      this.impacts = JSON.parse(JSON.stringify(res));
    });
  }
}
