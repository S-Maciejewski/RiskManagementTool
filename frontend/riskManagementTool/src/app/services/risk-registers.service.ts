import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiskRegistersService {

  constructor(private apiGetService: ApiGetService) { }

  getRiskRegisters(projectId: number): any {
    let promise = new Promise((resolve, reject) => {
      var params = new HttpParams().set("projectId", projectId + ''); //projectId conversion to string needed
      //TODO use getWithParams instead of getMockWithParams
      this.apiGetService.getMockWithParams('http://www.mocky.io/v2/5ec5487d2f000007e5dc313c', params).subscribe( result => {
        resolve(result);
      });
    });
    return promise;
  }

  

}
