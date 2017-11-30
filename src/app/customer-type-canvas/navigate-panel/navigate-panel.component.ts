import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navigate-panel',
  templateUrl: 'navigate-panel.component.html',
  styleUrls: ['navigate-panel.component.scss']
})
export class NavigatePanelComponent implements OnInit {

  @Input()
  private navigatePanel;

  constructor() { }

  ngOnInit() {
  }

}
