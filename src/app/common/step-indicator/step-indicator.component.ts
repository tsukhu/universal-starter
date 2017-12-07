import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'step-indicator',
  templateUrl: 'step-indicator.component.html',
  styleUrls: ['step-indicator.component.scss']
})
export class StepIndicatorComponent {
  @Input() public cms;
  @Input() public stepIndex: number;
  @Input() public customerType: boolean = true;
}
