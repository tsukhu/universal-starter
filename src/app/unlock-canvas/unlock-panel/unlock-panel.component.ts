import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'unlock-panel',
  templateUrl: 'unlock-panel.component.html',
  styleUrls: ['unlock-panel.component.scss']
})
export class UnlockPanelComponent implements OnInit {

  @Input()
  public devicePortal;

  @Input()
  public deviceHelp;

  constructor() { }

  ngOnInit() {
  }

}
