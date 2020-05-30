import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { HttpParams } from '@angular/common/http';
import { RiskRegister } from '../model/riskRegister';
import { RisksService } from './risks.service';


const api = {
  riskRegister: 'RiskRegister',
  details: 'RiskRegister/details/',
  create: 'RiskRegister/create',
  edit: 'RiskRegister/edit/',
  delete: 'RiskRegister/delete/',
}

@Injectable({
  providedIn: 'root'
})
export class RiskRegistersService {
  public currentRegister: RiskRegister;

  constructor(private apiGetService: ApiGetService, private risksService: RisksService) { }

  getRegisters(projectId: number): any {
    let promise = new Promise((resolve, reject) => {
      var params = new HttpParams().set("projectId", projectId + ''); //projectId conversion to string needed
      this.apiGetService.getWithParams(api.riskRegister, params).subscribe(result => {
        resolve(result);
      });
    });
    return promise;
  }

  getRegisterDetails(id: number): any {
    let promise = new Promise((resolve, reject) => {
      //get details
      this.apiGetService.get(api.details + id).subscribe(res => {
        var register = JSON.parse(JSON.stringify(res));
        this.currentRegister = new RiskRegister(register.id, register.projectId, register.name, register.description);
        // get risks
        this.risksService.getRisks(register.id).then(result => {
          this.currentRegister.risks = result;
          resolve(this.currentRegister);
        });
      });
    });
    return promise;
  }

  getEditDetails(id: number): RiskRegister {
    if (this.currentRegister != null && this.currentRegister.id === id) { //make sure currentRegister is requested register
      return this.currentRegister;
    } else { //fetch data for requested register
      this.getRegisterDetails(id).then(
        result => {
          return result;
        }
      );
    }
  }

  createRegister(projectId: number, name: string, description: string) {
    var register = {
      projectId: projectId,
      name: name,
      description: description
    }
    this.apiGetService.apiPost(api.create, register).subscribe();
  }

  updateRegister(id: number, projectId: number, name: string, description: string) {
    var registerDetails = {
      id: id,
      projectId: projectId,
      name: name,
      description: description
    }
    this.apiGetService.apiPost(api.edit + id, registerDetails).subscribe();
  }

  deleteRegister(id: number) {
    this.apiGetService.apiPost(api.delete + id, {}).subscribe();
  }

}
