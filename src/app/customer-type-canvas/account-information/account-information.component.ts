import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {

  @Input()
  public cms;

  constructor( public modalService: ModalService) { }

  ngOnInit() {
  }

  modalClosed(e) {

  }

}
