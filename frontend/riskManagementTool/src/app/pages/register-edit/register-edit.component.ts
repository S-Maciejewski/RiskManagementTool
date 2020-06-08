import { Component, OnInit } from '@angular/core';
import { RiskRegister } from 'src/app/model/riskRegister';
import { ActivatedRoute, Router } from '@angular/router';
import { RiskRegistersService } from 'src/app/services/risk-registers.service';

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.component.html',
  styleUrls: ['./register-edit.component.css']
})
export class RegisterEditComponent implements OnInit {

  constructor(
    private riskRegistersService: RiskRegistersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public riskRegister: RiskRegister;

  ngOnInit(): void {
    this.riskRegister = new RiskRegister();
    this.getRegisterId();
    this.getRegister();
  }

  getRegisterId() {
    this.route.paramMap.subscribe(params => {
      this.riskRegister.id = +params.get('id');
    });
  }

  getRegister() {
    this.riskRegister = this.riskRegistersService.getEditDetails(this.riskRegister.id);
  }

  public save(): void {
    this.riskRegistersService.updateRegister(this.riskRegister.id, this.riskRegister.projectId, this.riskRegister.name, this.riskRegister.description);
    this.router.navigate(['/registers/details/' + this.riskRegister.id]);
  }

}
