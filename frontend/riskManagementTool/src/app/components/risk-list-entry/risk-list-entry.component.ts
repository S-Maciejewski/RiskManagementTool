import { Component, OnInit, Input } from '@angular/core';
import { Risk } from '../../model/risk';
import { StoreService } from 'src/app/services/store.service';

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


  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.risk.dateRaised = new Date(this.risk.dateRaised);
    this.impact = this.storeService.impactsNames[this.risk.impactId - 1];
    this.probability = this.storeService.probabilityNames[this.risk.probabilityId - 1];
    this.severity = this.storeService.severityNames[this.risk.severityId - 1];
  }

}
