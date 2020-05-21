import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

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
        url = 'http://www.mocky.io/v2/5ec46b293000000c6d39c878';
      else if(projectId === 1)
        url = 'http://www.mocky.io/v2/5ec46c09300000df0639c87e';
      else if(projectId === 2)
        url = 'http://www.mocky.io/v2/5ec46c1f300000f33d39c87f';
      else
        url = 'http://www.mocky.io/v2/5ec46c4d300000692339c880';
      this.apiGetService.getMock(url).subscribe( res => {
        var project = JSON.parse(JSON.stringify(res));
        resolve(project);
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
      console.log("after post");
    });
  }

}
