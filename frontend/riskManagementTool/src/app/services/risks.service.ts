import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { HttpParams } from '@angular/common/http';

const api = {
  risk: 'risk',
}

@Injectable({
  providedIn: 'root'
})
export class RisksService {

  constructor(private apiGetService: ApiGetService) { }

  getRisks(registerId: number): any {
    let promise = new Promise((resolve, reject) => {
      var params = new HttpParams().set("registerId", registerId + ''); //registerId conversion to string needed
      this.apiGetService.getWithParams(api.risk, params).subscribe(result => {
        resolve(result);
      });
    });
    return promise;
  }

}
