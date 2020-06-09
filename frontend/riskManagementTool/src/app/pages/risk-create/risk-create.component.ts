import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RisksService } from 'src/app/services/risks.service';
import { Risk } from 'src/app/model/risk';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-risk-create',
  templateUrl: './risk-create.component.html',
  styleUrls: ['./risk-create.component.css']
})
export class RiskCreateComponent implements OnInit {

  public risk: Risk;
  public impacts: string[];
  public probabilities: string[];
  public severities: string[];

  constructor(
    private risksService: RisksService,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.risk = new Risk();
    this.risk.dateRaised = new Date();
    this.route.paramMap.subscribe(params => {
      this.risk.registerId = +params.get('registerId');
    });
    this.getEnums();
  }

  getEnums() {
    this.impacts = this.storeService.impacts;
    this.probabilities = this.storeService.probability;
    this.severities = this.storeService.severity;
  }

  public create(): void {
    this.risksService.createRisk(this.risk);
    this.router.navigate(['/registers/details', this.risk.registerId]);
  }

}
