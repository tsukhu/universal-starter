import { UnlockService } from '../../common/services/unlock.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { PreloaderService } from '../../common/services/preloader.service';

@Component({
  selector: 'account-imei-information',
  templateUrl: 'account-imei-information.component.html',
  styleUrls: ['account-imei-information.component.scss']
})
export class AccountIEMIInformationComponent implements OnInit {

  // @Input()
  public cms;
  imeiNumber = undefined;
  showDeviceDetail: boolean = false;
  isInvalid: boolean = true;
  nonAttImeiReqErr: boolean = false;
  deviceMake = undefined;
  deviceModel = undefined;

  constructor(public modalService: ModalService, private unlockService: UnlockService,
    private route: Router, private preloader: PreloaderService) {
    this.unlockService.UnlockDevice().subscribe(
      (data: any) => {
        this.cms = data.unlockPortalLabelAndErrorObj[0];
      }
    )
  }

  ngOnInit() {
  }

  unlockNext() {
    // this.unlockService.orderFlow(this.wirelessNumber)
    //   .subscribe((data: any) => {
    //     console.log(data);

    //     this.route.navigate['/unlockstep2'];
    //   },
    //   (error) => {
    //     console.log(error);
    //   });

    this.route.navigate(['/unlockConfirm']);
  }

  unlockPrevious() {
    this.route.navigate(['/unlockstep2']);

    this.route.navigate(['/unlockstep2']);
  }


  validateNext(event) {
    if (this.imeiNumber.length == 0) {
      this.nonAttImeiReqErr = true;
    } else {
      this.nonAttImeiReqErr = false;
    }

    if (this.imeiNumber.length < 15) {
      this.isInvalid = true;
    }

    if (this.imeiNumber.length == 15) {
      this.isInvalid = false;
      this.preloader.start();
      this.unlockService.imeiMakeModelResponse(this.imeiNumber)
        .subscribe((data: any) => {
          // return data;
          // this.route.navigate['/unlock-canvas'];
          this.preloader.stop();
          this.showDeviceDetail = true;
          this.deviceMake = data.orderFlowResponseDO.make;
          this.deviceModel = data.orderFlowResponseDO.model;
        },
        (error) => {
          console.log(error);
          this.preloader.stop();
        });
    }

    
  }

}
