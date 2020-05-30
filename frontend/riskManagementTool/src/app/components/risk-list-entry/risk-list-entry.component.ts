import { Component, OnInit, Input } from '@angular/core';
import { Risk } from '../../model/risk';

@Component({
  selector: 'app-risk-list-entry',
  templateUrl: './risk-list-entry.component.html',
  styleUrls: ['./risk-list-entry.component.scss']
})
export class RiskListEntryComponent implements OnInit {
  @Input() risk: Risk;

  constructor() { }

  ngOnInit(): void {
  }

}
