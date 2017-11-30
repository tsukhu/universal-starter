import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  @Input()
  public cms;

  constructor( public modalService: ModalService) { }

  ngOnInit() {
  }

  modalClosed(e) {

  }

}
