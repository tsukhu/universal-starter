import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { Router } from "@angular/router";
import { UnlockStatusService } from "../../common/services/unlock-status.service";
import { ISubscription } from "rxjs/Subscription";
import { UnlockService } from "../../common/services/unlock.service";

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {

  public cms: any;

  imeiNumber: string = undefined;
  requestNumber: string = undefined;
  nonAttImeiReqErr: boolean = false;
  nonAttReqNoErr: boolean = false;
  isInvalid: boolean = true;
  private subscription: ISubscription;
  constructor( public modalService: ModalService, private unlockStatusService: UnlockStatusService, private route: Router, private unlockService: UnlockService) { 
    this.subscription = this.unlockStatusService.UnlockDevice().subscribe(
      (data: any) => {
        this.cms = data.unlockPortalLabelAndErrorObj[0];
      }
    )
  }

  ngOnInit() {
  }

  modalClosed(e) {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 
  validateNext(event) {
    if (this.imeiNumber != undefined && this.imeiNumber.length == 0) {
      this.nonAttImeiReqErr = true;
    } else {
      this.nonAttImeiReqErr = false;
    }
    if (this.requestNumber != undefined && this.requestNumber.length == 0) {
      this.nonAttReqNoErr = true;
    } else {
      this.nonAttReqNoErr = false;
    }
    if((this.requestNumber != undefined && this.requestNumber.length == 10) && (this.imeiNumber != undefined && this.imeiNumber.length == 15)) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }

  unlockNext() {
    this.route.navigate(['/unlock-status-confirm', {imeiNumber: this.imeiNumber}]);
  }

  getToken(event) {
    console.log(event.token);
    this.unlockService.verifyCaptcha(event.token)
      .subscribe((data: any) => {
        console.log("data",data);
      },
      (error) => {      
        console.log("error",error);
      });
  }
}
