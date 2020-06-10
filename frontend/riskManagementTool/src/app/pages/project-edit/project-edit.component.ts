import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public project: Project;

  ngOnInit(): void {
    this.project = new Project();
    this.getProjectId();
    this.getProject();
  }

  getProjectId() {
    this.route.paramMap.subscribe(params => {
      this.project.id = +params.get('id');
    });
  }

  getProject() {
    this.project = this.projectsService.getEditDetails(this.project.id);
  }

  public save(): void {
    this.projectsService.updateProject(this.project.id, this.project.name, this.project.description).subscribe(res => {
      if (res)
        this.router.navigate(['/projects/details/' + this.project.id]);
    });
  }

}
