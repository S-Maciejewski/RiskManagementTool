import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


const api = {
  impact: 'impact',
}


@Injectable({
  providedIn: 'root'
})
export class ApiGetService {

  readonly apiAddress = environment.apiAddress;

  constructor(public http: HttpClient) { }

  getMock(url: string) {
    return this.http.get(url, httpOptions);
  }

  // TODO: Test api response when .Net API is properly set up
  testApiResponse() {
    return this.http.get(this.apiAddress + api.impact, httpOptions);
  }
}
