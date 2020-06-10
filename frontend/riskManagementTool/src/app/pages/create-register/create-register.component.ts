import { Component, OnInit } from '@angular/core';
import { RiskRegistersService } from "../../services/risk-registers.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.scss']
})
export class CreateRegisterComponent implements OnInit {

  constructor(
    private riskRegistersService: RiskRegistersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  projectId: number;
  name: string;
  description: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('projectId');
    });
  }

  public create(): void {
    this.riskRegistersService.createRegister(this.projectId, this.name, this.description)
      .subscribe(res => {
        if (res)
          this.router.navigate(['/projects/details', this.projectId]);
      });
  }

}