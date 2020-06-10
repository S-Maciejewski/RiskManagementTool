import { Component, OnInit } from '@angular/core';
import { RiskRegistersService } from 'src/app/services/risk-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RiskRegister } from 'src/app/model/riskRegister';
import { Risk } from 'src/app/model/risk';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.scss']
})
export class RegisterDetailsComponent implements OnInit {

  public riskRegister: RiskRegister;
  sortOptions = ['Impact', 'Probability', 'Severity'];

  constructor(
    private riskRegistersService: RiskRegistersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.riskRegister = new RiskRegister();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = +params.get('id');
      this.riskRegistersService.getRegisterDetails(id).then(
        result => {
          this.riskRegister = new RiskRegister(id, result.projectId, result.name, result.description, result.risks);
        }
      );
    });
  }

  delete(id: number) {
    this.riskRegistersService.deleteRegister(id).subscribe(res => {
      if (res)
        this.router.navigate(['/projects/details/' + this.riskRegister.projectId]);
    });
  }

  openCreateView() {
    this.router.navigate(['risks/create', this.riskRegister.id]);
  }

  sortingChange(event) {
    switch (event.value) {
      case 'Impact': this.riskRegister.risks = (this.riskRegister.risks as Risk[]).sort((a, b) => b.impactId - a.impactId);
        break;
      case 'Probability': this.riskRegister.risks = (this.riskRegister.risks as Risk[]).sort((a, b) => b.probabilityId - a.probabilityId);
        break;
      case 'Severity': this.riskRegister.risks = (this.riskRegister.risks as Risk[]).sort((a, b) => b.severityId - a.severityId);
        break;
      default: this.riskRegister.risks = (this.riskRegister.risks as Risk[]).sort((a, b) => b.id - a.id);
        break;
    }
  }

}
