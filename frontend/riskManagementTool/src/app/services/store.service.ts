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

  public impacts: any[];
  public probability: any[];
  public severity: any[];

  public impactsNames: string[];
  public probabilityNames: string[];
  public severityNames: string[];

  getEnums() {
    this.fetchImpacts();
    this.fetchProbability();
    this.fetchSeverity();
  }

  fetchImpacts() {
    this.apiGetService.get(api.impact).subscribe(res => {
      this.impacts = JSON.parse(JSON.stringify(res));
      this.impactsNames = this.impacts.map(o => o.name);
    });
  }

  fetchProbability() {
    this.apiGetService.get(api.probability).subscribe(res => {
      this.probability = JSON.parse(JSON.stringify(res));
      this.probabilityNames = this.probability.map(o => o.name);
    });
  }

  fetchSeverity() {
    this.apiGetService.get(api.severity).subscribe(res => {
      this.severity = JSON.parse(JSON.stringify(res));
      this.severityNames = this.severity.map(o => o.name);
    });
  }
}
