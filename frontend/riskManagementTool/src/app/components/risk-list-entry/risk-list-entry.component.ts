import { Component, OnInit, Input } from '@angular/core';
import { Risk } from '../../model/risk';
import { StoreService } from 'src/app/services/store.service';
import { RisksService } from 'src/app/services/risks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk-list-entry',
  templateUrl: './risk-list-entry.component.html',
  styleUrls: ['./risk-list-entry.component.scss']
})
export class RiskListEntryComponent implements OnInit {
  @Input() risk: Risk;

  impact: string;
  probability: string;
  severity: string;


  constructor(
    private router: Router,
    private risksService: RisksService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.risk.dateRaised = new Date(this.risk.dateRaised);
    this.impact = this.storeService.impactsNames[this.risk.impactId - 1];
    this.probability = this.storeService.probabilityNames[this.risk.probabilityId - 1];
    this.severity = this.storeService.severityNames[this.risk.severityId - 1];
  }

  delete() {
    this.risksService.deleteRisk(this.risk.id).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/registers/details/' + this.risk.registerId]));
      }
    });
  }

}
