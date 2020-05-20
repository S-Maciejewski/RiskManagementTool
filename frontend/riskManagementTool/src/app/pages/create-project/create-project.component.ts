import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
  ) { }

  name: string;
  description: string; 

  ngOnInit(): void {
  }

  public create(): void {
    this.projectsService.createProject(this.name, this.description);
  }

}
