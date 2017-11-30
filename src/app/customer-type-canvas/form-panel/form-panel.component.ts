import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';

@Component({
  selector: 'form-panel',
  templateUrl: 'form-panel.component.html',
  styleUrls: ['form-panel.component.scss']
})
export class FormPanelComponent implements OnInit {

  @Input()
  public formPanel;

  constructor( public modalService: ModalService) { }

  ngOnInit() {
  }

  modalClosed(e) {

  }

}
