import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";


const api = {
  impact: 'impact',
  probability: 'probability',
  severity: 'severity'
}

// Service for storing common immutable data (i.e. database enums)
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private apiGetService: ApiGetService) { }

  public impacts: object;
  public probability: object;
  public severity: object;


  getEnums() {
    this.fetchImpacts();
    this.fetchProbability();
    this.fetchSeverity();
  }

  fetchImpacts() {
    this.apiGetService.get(api.impact).subscribe(res => {
      this.impacts = JSON.parse(JSON.stringify(res));
    });
  }

  fetchProbability() {
    this.apiGetService.get(api.probability).subscribe(res => {
      this.probability = JSON.parse(JSON.stringify(res));
    });
  }

  fetchSeverity() {
    this.apiGetService.get(api.severity).subscribe(res => {
      this.severity = JSON.parse(JSON.stringify(res));
    });
  }
}
