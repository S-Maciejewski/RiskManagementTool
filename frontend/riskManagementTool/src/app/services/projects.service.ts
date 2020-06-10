import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { Project } from '../model/project';
import { RiskRegistersService } from './risk-registers.service';

const api = {
  project: 'project', // TODO: Fix projects list (user should see just his projects)
  details: 'project/details/',
  create: 'project/create',
  edit: 'project/edit/',
  delete: 'project/delete/'
};

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public currentProject: Project;

  constructor(private apiGetService: ApiGetService,
    private riskRegistersService: RiskRegistersService) { }

  getProjects() {
    let promise = new Promise((resolve, reject) => {
      this.apiGetService.get(api.project).subscribe(res => {
        var projects = JSON.parse(JSON.stringify(res));
        resolve(projects);
      });
    });
    return promise;
  }

  getProjectDetails(id: number): any {
    let promise = new Promise((resolve, reject) => {
      this.apiGetService.get(api.details + id).subscribe(res => {
        var project = JSON.parse(JSON.stringify(res));
        this.currentProject = new Project(project.id, project.name, project.description);
        //get risk registers
        this.riskRegistersService.getRegisters(project.id).then(result => {
          this.currentProject.riskRegisters = result;
          resolve(this.currentProject);
        });
      });
    });
    return promise;
  }

  getEditDetails(id: number): Project {
    if (this.currentProject != null && this.currentProject.id === id) { //make sure currentProject is requested project
      return this.currentProject;
    } else { //fetch data for requested project
      this.getProjectDetails(id).then(
        result => {
          return result;
        }
      );
    }
  }


  createProject(name: string, description: string) {
    var project = {
      name: name,
      description: description
    }
    return this.apiGetService.apiPost(api.create, project);
  }

  updateProject(id: number, name: string, description: string) {
    var projectDetails = {
      id: id,
      name: name,
      description: description
    }
    return this.apiGetService.apiPost(api.edit + id, projectDetails);
  }

  deleteProject(id: number) {
    return this.apiGetService.apiPost(api.delete + id, {});
  }

}
