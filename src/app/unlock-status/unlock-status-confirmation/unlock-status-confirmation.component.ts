import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { UnlockStatusService } from "../../common/services/unlock-status.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'unlock-status-confirmation',
  templateUrl: 'unlock-status-confirmation.component.html',
  styleUrls: ['unlock-status-confirmation.component.scss']
})
export class UnlockStatusConfirmationComponent implements OnInit {

  @Input()
  public cms;

  public orderStatus: any;
  public imeiNumber;

  constructor( public modalService: ModalService, private unlockStatusService: UnlockStatusService, private route: ActivatedRoute) {
    this.imeiNumber = this.route.snapshot.params['imeiNumber'];    
   }

  ngOnInit() {
    this.unlockStatusService.UnlockDevice().subscribe(
      (data: any) => {
        this.cms = data.unlockPortalLabelAndErrorObj[0];
      }
    );
    this.unlockStatusService.unlockOrderStatus().subscribe(
      (data:any) => {
        this.orderStatus = data.oceUnlockOrderStatusDO;
      }
    )
  }

}
