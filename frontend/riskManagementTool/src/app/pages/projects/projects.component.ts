import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    ) { }

  projects: any;

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projects = this.projectsService.getProjects().then(
      result => {
        this.projects = result;
      }
    );
  }

}
