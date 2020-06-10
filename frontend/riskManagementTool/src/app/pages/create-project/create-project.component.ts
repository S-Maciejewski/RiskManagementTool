import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) { }

  name: string;
  description: string;

  ngOnInit(): void {
    this.description = "";
  }

  public create(): void {
    this.projectsService.createProject(this.name, this.description).subscribe(res => {
      if (res)
        this.router.navigate(['/projects']);
    });
  }

}
