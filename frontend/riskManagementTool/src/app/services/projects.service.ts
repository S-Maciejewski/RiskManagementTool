import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {


  //TODO
  //change all mock url's with backend endpoints

  constructor(private apiGetService: ApiGetService) { }

  getProjects() {
    let promise = new Promise((resolve, reject) => {
      this.apiGetService.getMock('http://www.mocky.io/v2/5ec46d43300000f33d39c883').subscribe( res => {
        var projects = JSON.parse(JSON.stringify(res));
        resolve(projects);
      });
    });
    return promise;
  }

  getProjectDetails(projectId: number): any {
    let promise = new Promise((resolve, reject) => {
      var url = '';
      if(projectId === 0)
        url = 'http://www.mocky.io/v2/5ecd54f23200004f002368d5';
      else if(projectId === 1)
        url = 'http://www.mocky.io/v2/5ec46c09300000df0639c87e';
      else if(projectId === 2)
        url = 'http://www.mocky.io/v2/5ec46c1f300000f33d39c87f';
      else
        url = 'http://www.mocky.io/v2/5ecd63f43000006900ea0abe';

      //get details
      this.apiGetService.getMock(url).subscribe( res => {
        var project = JSON.parse(JSON.stringify(res));
        //get risk registers
        this.apiGetService.getMock('http://www.mocky.io/v2/5ec5487d2f000007e5dc313c').subscribe( res => {
          project.riskRegisters = res;
          resolve(project);
        });
      });
    });
    return promise;
  }

  createProject(name: string, description: string) {
    var project = {
      name: name,
      description: description
    }
    this.apiGetService.apiPost("projects/create", project).subscribe( res => {
      console.log("after createProject");
    });
  }

  updateProject(projectId: number, name: string, description: string) {
    var projectDetails = {
      id: projectId,
      name: name,
      description: description
    }
    var endpoint = 'Project/Edit/' + projectId;
    this.apiGetService.apiPost(endpoint, projectDetails).subscribe( res => {
      console.log("after updateProject");
    });
  }

}
