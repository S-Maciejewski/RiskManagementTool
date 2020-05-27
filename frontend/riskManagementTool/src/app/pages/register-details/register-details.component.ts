import { Component, OnInit } from '@angular/core';
import { RiskRegistersService } from 'src/app/services/risk-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RiskRegister } from 'src/app/model/riskRegister';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.scss']
})
export class RegisterDetailsComponent implements OnInit {

  public riskRegister: RiskRegister;

  constructor(
    private riskRegistersService: RiskRegistersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.riskRegister = new RiskRegister();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = +params.get('id');
      this.riskRegistersService.getRegisterDetails(id).then(
        result => {
            this.riskRegister = new RiskRegister(id, result.projectId, result.name, result.description, result.risks);
          console.log(this.riskRegister);  
        }
      );
    });
  }

  delete(id: number) {
    this.riskRegistersService.deleteRegister(id);
    this.router.navigate(['/projects/details/' + this.riskRegister.projectId]);
  }

}
