import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';

@Component({
  selector: 'wireless-number',
  templateUrl: 'wireless-number.component.html',
  styleUrls: ['wireless-number.component.scss']
})
export class WirelessNumberComponent implements OnInit {

  @Input()
  public cms;

  constructor( public modalService: ModalService) { }

  ngOnInit() {
  }

  modalClosed(e) {

  }

}
