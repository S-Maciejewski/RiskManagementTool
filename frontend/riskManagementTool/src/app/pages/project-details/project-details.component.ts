import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
  ) { }

  public projectId: number;
  public name: string;
  public description: string;
  public riskRegisters: object;

  ngOnInit(): void {
    this.getProjectId();
    this.getProject();    
  }

  getProjectId() {
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('projectId');
    });
  }

  getProject() {
    this.projectsService.getProjectDetails(this.projectId).then(
      result => {
        var project = result;
        this.name = project.name;
        this.description = project.description;
        this.riskRegisters = project.riskRegisters;
      }
    );
  }

}
