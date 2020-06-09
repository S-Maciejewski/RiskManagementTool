import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";
import { Router } from '@angular/router';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private router: Router
    ) { }

  projects: any;

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectsService.getProjects().then(
      result => {
        this.projects = result;
      }
    );
  }

  openCreateView() {
    this.router.navigate(['projects/create']);
  }

}
