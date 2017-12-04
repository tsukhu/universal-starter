import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { UnlockService } from '../../common/services/unlock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  public cms;

  requestNo: string =  undefined;

  constructor(public modalService: ModalService, private unlockService: UnlockService,
    private route: Router) { }

  ngOnInit() {
    this.unlockService.UnlockDevice().subscribe(
      (data: any) => {
        this.cms = data.unlockPortalLabelAndErrorObj[0];
      }
    );

     this.unlockService.confirmation().subscribe(
      (data: any) => {
        // this.requestNo = "ABC";
        this.requestNo = data.orderFlowResponseDO.requestNo;
      }
    );
  }

}
