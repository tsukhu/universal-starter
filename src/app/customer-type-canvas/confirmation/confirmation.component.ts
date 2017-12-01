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

  // @Input()
  public cms;

  customerType: boolean = true;
  isValid: boolean = true;
  wirelessNumber: string = undefined;
  termsChecked: boolean = false;
  // wireLessErrorMsg: boolean = false;
  imeiNumber: string = undefined;

  attWrlsNoReqErr: boolean = false;
  attWrlsLengthWErr: boolean = false;
  attWrlsValidErr: boolean = false;
  attWrlsValidServerErr: boolean = false;

  nonAttImeiReqErr: boolean = false;

  deviceMake: string;
  deviceModel: string;
  showDeviceDetail: boolean = false;

  constructor(public modalService: ModalService, private unlockService: UnlockService,
    private route: Router) { }

  ngOnInit() {
    // let requestJson = {};
    // this.unlockService.redirectOCEWorkFlow()
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     // return data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   });
    this.unlockService.UnlockDevice().subscribe(
      (data: any) => {
        this.cms = data.unlockPortalLabelAndErrorObj[0];
      }
    );
  }

  modalClosed(e) {

  }
  onCustomerTypeChange(value: boolean) {
    console.log(value);
    this.customerType = value;
  }

  validateNext(event) {

    if (this.customerType) {
      if (this.wirelessNumber.length == 0) {
        this.attWrlsNoReqErr = true;
      } else {
        this.attWrlsNoReqErr = false;
      }

      if (this.wirelessNumber != undefined && this.wirelessNumber.length == 10
        && this.termsChecked) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    } else {
      if (this.imeiNumber.length == 0) {
        this.nonAttImeiReqErr = true;
      } else {
        this.nonAttImeiReqErr = false;
      }

      if (this.imeiNumber != undefined && this.imeiNumber.length == 15
        && this.termsChecked) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }

      if (this.imeiNumber.length == 15) {
        console.log("validate iemi");
        // this.unlockService.orderFlow(this.iemiNumber)
        //   .subscribe((data: any) => {
        //     console.log(data);
        //     // return data;
        //     this.route.navigate['/unlock-canvas'];
        //     this.deviceMake = data.orderFlowResponseDO.make;
        //     this.deviceModel = data.orderFlowResponseDO.model;
        //     this.showDeviceDetail = true;
        //   },
        //   (error) => {
        //     console.log(error);
        //   });
      }
    }

  }

  termsChange() {
    this.termsChecked = !this.termsChecked;

    if (this.customerType) {
      if (this.wirelessNumber != undefined && this.wirelessNumber.length == 10
        && this.termsChecked) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    } else {
      if (this.imeiNumber != undefined && this.imeiNumber.length == 15
        && this.termsChecked) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    }

  }

  unlockNext() {
    // this.unlockService.orderFlow(this.wirelessNumber)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     // return data;
    //     this.route.navigate['/unlock-canvas'];
    //   },
    //   (error) => {
    //     console.log(error);
    //   });
    alert("navigate");
    this.route.navigate(['/unlock-canvas']);
  }

  unlockPevious() {
    alert("navigate");
    this.route.navigate(['/unlock-canvas']);
  }


}
