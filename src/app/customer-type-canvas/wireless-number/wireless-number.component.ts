import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { Router } from '@angular/router';
import { UnlockService } from '../../common/services/unlock.service';
import { PreloaderService } from '../../common/services/preloader.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wireless-number',
  templateUrl: 'wireless-number.component.html',
  styleUrls: ['wireless-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WirelessNumberComponent implements OnInit {
  @Input() public cms: any;
  public stepIndex = 1;
  public customerType: boolean = true;
  public isInvalid: boolean = true;
  // public wirelessNumber: string = undefined;
  public termsChecked: boolean = false;
  // wireLessErrorMsg: boolean = false;
  // public imeiNumber: string = undefined;

  public attWrlsNoReqErr: boolean = false;
  public attWrlsLengthWErr: boolean = false;
  public attWrlsValidErr: boolean = false;
  public attWrlsValidServerErr: boolean = false;

  public nonAttImeiReqErr: boolean = false;
  public errorMessage: boolean = false;

  public deviceMake: string;
  public deviceModel: string;
  public showDeviceDetail: boolean = false;
   wirelessNumberForm: FormGroup;
  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private route: Router,
    private fb: FormBuilder,
    private preloader: PreloaderService
  ) {
    this.wirelessNumberForm = fb.group({
      imeiNumber : ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      wirelessNumber : ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      validate : ''
    });
  }

  public ngOnInit() {}

  public modalClosed(e) {}

  public onCustomerTypeChange(value: boolean) {
    this.customerType = value;
  }

  get imeiNumber() {
     return this.wirelessNumberForm.get('imeiNumber');
  }
  get wirelessNumber() {
     return this.wirelessNumberForm.get('wirelessNumber');
  }

  // get termsChecked() {
  //   return this.wirelessNumberForm.get('termsChecked');
  // }

  // public validateNext(event) {
  //   if (this.customerType) {
  //     if (
  //       this.wirelessNumber !== undefined &&
  //       this.wirelessNumber.length === 0
  //     ) {
  //       this.attWrlsNoReqErr = true;
  //     } else {
  //       this.attWrlsNoReqErr = false;
  //     }

  //     if (
  //       this.wirelessNumber !== undefined &&
  //       this.wirelessNumber.length === 10 &&
  //       this.termsChecked
  //     ) {
  //       this.isInvalid = false;
  //     } else {
  //       this.isInvalid = true;
  //     }
  //   } else {
  //     if (this.imeiNumber !== undefined && this.imeiNumber.length === 0) {
  //       this.nonAttImeiReqErr = true;
  //     } else {
  //       this.nonAttImeiReqErr = false;
  //     }

  //     if (
  //       this.imeiNumber !== undefined &&
  //       this.imeiNumber.length === 15 &&
  //       this.termsChecked
  //     ) {
  //       this.isInvalid = false;
  //     } else {
  //       this.isInvalid = true;
  //     }

  //     if (this.imeiNumber !== undefined && this.imeiNumber.length === 15) {
  //       this.preloader.start();
  //       this.unlockService.imeiMakeModelResponse(this.imeiNumber).subscribe(
  //         (data: any) => {
  //           console.log('validate iemi');
  //           console.log(data);
  //           // return data;
  //           // this.route.navigate['/unlock-canvas'];
  //           this.preloader.stop();
  //           this.showDeviceDetail = true;
  //           this.deviceMake = data.orderFlowResponseDO.make;
  //           this.deviceModel = data.orderFlowResponseDO.model;
  //         },
  //         (error) => {
  //           console.log(error);
  //           this.preloader.stop();
  //         }
  //       );
  //     }
  //   }
  // }


  public validateNext(event) {
    console.log("working");
    if (!this.customerType) {
      if (this.imeiNumber !== undefined && this.imeiNumber.value.length === 15) {
        this.preloader.start();
        this.unlockService.imeiMakeModelResponse(this.imeiNumber).subscribe(
          (data: any) => {
            console.log("working");
            this.preloader.stop();
            this.showDeviceDetail = true;
            this.deviceMake = data.orderFlowResponseDO.make;
            this.deviceModel = data.orderFlowResponseDO.model;
          },
          (error) => {
            console.log(error);
            this.preloader.stop();
          }
        );
      }
    }
  }

  public termsChange() {
     this.termsChecked = !this.termsChecked;
     console.log(this.termsChecked + " - " + this.customerType);
  }
  // public termsChange() {
  //   this.termsChecked = !this.termsChecked;

  //   if (this.customerType) {
  //     if (
  //       this.wirelessNumber !== undefined &&
  //       this.wirelessNumber.length === 10 &&
  //       this.termsChecked
  //     ) {
  //       this.isInvalid = false;
  //     } else {
  //       this.isInvalid = true;
  //     }
  //   } else {
  //     if (
  //       this.imeiNumber !== undefined &&
  //       this.imeiNumber.length === 15 &&
  //       this.termsChecked
  //     ) {
  //       this.isInvalid = false;
  //     } else {
  //       this.isInvalid = true;
  //     }
  //   }
  // }

  // termsChange() {
    
  // }

  public unlockNext() {
    if (this.customerType) {
      this.unlockService.orderFlow(this.wirelessNumber).subscribe(
        (data: any) => {
          console.log(data);

          this.route.navigate([
            '/unlockstep2/',
            { wirelessNumber: this.wirelessNumber }
          ]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.unlockService.imeiOrderFlow(this.imeiNumber).subscribe(
        (data: any) => {
          console.log(data);

          this.route.navigate(['/nonattunlock']);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    // this.route.navigate(['/unlockstep2', {wirelessNumber: this.wirelessNumber}]);
  }

  public unlockPrevious() {
    // alert("navigate");
    this.route.navigate(['/unlock-canvas']);
  }

  public getToken(event) {
    console.log(event.token);
    this.unlockService.verifyCaptcha(event.token).subscribe(
      (data: any) => {
        console.log('data', data);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
