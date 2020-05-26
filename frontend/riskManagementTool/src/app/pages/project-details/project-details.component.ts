import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) { }

  public project: Project;

  ngOnInit(): void {
    this.project = new Project();
    this.getProjectId();
    this.getProject();    
  }

  getProjectId() {
    this.route.paramMap.subscribe(params => {
      this.project.projectId = +params.get('projectId');
    });
  }

  getProject() {
    this.projectsService.getProjectDetails(this.project.projectId).then(
      result => {
        this.project.name = result.name;
        this.project.description = result.description;
        this.project.riskRegisters = result.riskRegisters;
      }
    );
  }

}