import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RisksService {

  constructor(private apiGetService: ApiGetService) { }
  
  getRisks(registerId: number): any {
    let promise = new Promise((resolve, reject) => {
      var params = new HttpParams().set("registerId", registerId + ''); //registerId conversion to string needed
      //TODO use getWithParams instead of getMockWithParams
      this.apiGetService.getMockWithParams('http://www.mocky.io/v2/5ecda7113000004900ea0bbb', params).subscribe( result => {
        resolve(result);
      });
    });
    return promise;
  }

}
