import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public project: Project;

  ngOnInit(): void {
    this.getProject();    
  }

  getProject() {
    this.route.paramMap.subscribe(params => {
      var id = +params.get('id');
      this.projectsService.getProjectDetails(id).then(
        result => {
            this.project = new Project(id, result.name, result.description, result.riskRegisters);
        }
      );
    });
  }

  delete(id: number) {
    this.projectsService.deleteProject(id);
    this.router.navigate(['/projects']);
  }

}
