import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const rawHttpOptions = {
  headers: httpHeaders,
};


const api = {
  impact: 'impact',
}


@Injectable({
  providedIn: 'root'
})
export class ApiGetService {
  readonly httpOptions = rawHttpOptions;
  readonly apiAddress = environment.apiAddress;

  constructor(public http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(this.apiAddress + endpoint, this.httpOptions);
  }

  getWithParams(endpoint: string, params: HttpParams) {
    return this.http.get(this.apiAddress + endpoint, { headers: httpHeaders, params: params });
  }

  //todo check, adjust, make it work...
  apiPost(endpoint: string, body: any) {
    return this.http.post<any>(this.apiAddress + endpoint, body, rawHttpOptions);
  }
}
