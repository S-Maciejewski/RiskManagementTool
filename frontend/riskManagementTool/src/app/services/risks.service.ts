import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { HttpParams } from '@angular/common/http';
import { Risk } from '../model/risk';

const api = {
  risk: 'risk',
  details: 'Risk/details/',
  create: 'Risk/create',
  edit: 'Risk/edit/',
  delete: 'Risk/delete/',
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

  getRiskDetails(id: number): any {
    let promise = new Promise((resolve, reject) => {
      //get details
      this.apiGetService.get(api.details + id).subscribe(res => {
        var risk = JSON.parse(JSON.stringify(res));
        var riskObj = new Risk(risk.id, risk.registerId, risk.dateRaised, risk.name, risk.description, risk.status, risk.impactId, risk.probabilityId, risk.severityId);
        resolve(riskObj);
      });
    });
    return promise;
  }

  createRisk(registerId: number, dateRaised: Date, name: string, description: string, status: string, impactId: number, probabilityId: number, severityId: number) {
    var risk = {
      registerId: registerId,
      dateRaised: dateRaised,
      name: name,
      description: description,
      status: status,
      impactId: impactId,
      probabilityId: probabilityId,
      severityId: severityId
    }
    this.apiGetService.apiPost(api.create, risk).subscribe();
  }

  updateRisk(risk: Risk) {
    //TODO is it working with Risk object?
    this.apiGetService.apiPost(api.edit + risk.id, risk).subscribe();
  }

  deleteRisk(id: number) {
    this.apiGetService.apiPost(api.delete + id, {}).subscribe();
  }

}
