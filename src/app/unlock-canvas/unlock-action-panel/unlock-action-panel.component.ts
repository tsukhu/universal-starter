import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'unlock-action-panel',
  templateUrl: 'unlock-action-panel.component.html',
  styleUrls: ['unlock-action-panel.component.scss']
})
export class UnlockActionPanelComponent implements OnInit {

  @Input()
  public actionPanel;
  
  constructor() { }

  ngOnInit() {
  }

}
