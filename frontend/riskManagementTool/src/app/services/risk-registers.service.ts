import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { HttpParams } from '@angular/common/http';
import { RiskRegister } from '../model/riskRegister';

@Injectable({
  providedIn: 'root'
})
export class RiskRegistersService {

  
  //TODO
  //change all mock url's with backend endpoints

  public currentRegister: RiskRegister;

  constructor(private apiGetService: ApiGetService) { }

  getRegisters(projectId: number): any {
    let promise = new Promise((resolve, reject) => {
      var params = new HttpParams().set("projectId", projectId + ''); //projectId conversion to string needed
      //TODO use getWithParams instead of getMockWithParams
      this.apiGetService.getMockWithParams('http://www.mocky.io/v2/5ec5487d2f000007e5dc313c', params).subscribe( result => {
        resolve(result);
      });
    });
    return promise;
  }

  getRegisterDetails(id: number): any {
    let promise = new Promise((resolve, reject) => {
      var url = '';
      if(id === 1)
        url = 'http://www.mocky.io/v2/5ecd97283000007100ea0b85';
      else if(id === 2)
        url = 'http://www.mocky.io/v2/5ecd97963000004900ea0b8c';
      else if(id === 3)
        url = 'http://www.mocky.io/v2/5ecd97a43000000f00ea0b8d';
      else
        url = 'http://www.mocky.io/v2/5ecd97d63000008b00ea0b8e';

      //get details
      this.apiGetService.get(url).subscribe( res => {
        var register = JSON.parse(JSON.stringify(res));
        this.currentRegister = new RiskRegister(register.id, register.projectId, register.name, register.description);
        //get risks
        // this.risksService.getRisks(register.id).then( result => {
        //   this.currentRegister.risks = result;
        //   resolve(this.currentRegister);
        // });
        resolve(this.currentRegister);
      });
    });
    return promise;
  }

  getEditDetails(id: number): RiskRegister {
    if(this.currentRegister != null && this.currentRegister.id === id ) { //make sure currentRegister is requested register
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
    this.apiGetService.apiPost("riskRegister/create", register).subscribe();
  }

  updateRegister(id: number, projectId: number, name: string, description: string) {
    var registerDetails = {
      id: id,
      projectId: projectId,
      name: name,
      description: description
    }
    var endpoint = 'riskRegister/edit/' + id;
    this.apiGetService.apiPost(endpoint, registerDetails).subscribe();
  }

  deleteRegister(id: number) {
    this.apiGetService.apiPost("riskRegister/delete/" + id, {}).subscribe();
  }

}
