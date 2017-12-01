import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { UnlockService } from '../../common/services/unlock.service';

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {

  @Input()
  public cms;

  constructor( public modalService: ModalService, private unlockService: UnlockService) { 
    this.unlockService.UnlockDevice().subscribe(
      (data: any) => {
        this.cms = data.unlockPortalLabelAndErrorObj[0];
      }
    )
  }

  ngOnInit() {
  }

  modalClosed(e) {

  }

}
