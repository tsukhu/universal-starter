import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'unlock-action-card',
  templateUrl: 'unlock-action-card.component.html',
  styleUrls: ['unlock-action-card.component.scss']
})
export class UnlockActionCardComponent {
  @Input() public actionCard;
}
