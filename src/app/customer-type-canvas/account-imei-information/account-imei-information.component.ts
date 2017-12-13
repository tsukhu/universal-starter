import { UnlockService } from '../../common/services/unlock.service';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { PreloaderService } from '../../common/services/preloader.service';

import { AppStore } from '../../common/models/appstore.model';
import { UnlockData, ActionCart } from '../../common/models/unlock.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'account-imei-information',
  templateUrl: 'account-imei-information.component.html',
  styleUrls: ['account-imei-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountIEMIInformationComponent  {
  // @Input()
  public cms: Observable<UnlockData>;
  // public imeiNumber = undefined;
  public showDeviceDetail: boolean = false;
  public isInvalid: boolean = true;
  public nonAttImeiReqErr: boolean = false;
  public deviceMake = undefined;
  public deviceModel = undefined;
  imeiInfoForm: FormGroup;
  public elementFocused;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private route: Router,
    private fb: FormBuilder,
    private preloader: PreloaderService,
    private store: Store<AppStore>) {
    this.cms = store.select('cms');

    this.imeiInfoForm = fb.group({
        imeiNumber : ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
        validate : ''
      });
  }

  get imeiNumber() {
     return this.imeiInfoForm.get('imeiNumber');
  }

  public unlockNext() {
    // this.unlockService.orderFlow(this.wirelessNumber)
    //   .subscribe((data: any) => {
    //     console.log(data);

    //     this.route.navigate['/unlockstep2'];
    //   },
    //   (error) => {
    //     console.log(error);
    //   });

    this.route.navigate(['/unlockConfirm/', { customerType: true }]);
  }

  public unlockPrevious() {
    this.route.navigate(['/unlockstep2']);
  }

  public validateNext(event) {
    console.log("working");

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

  // public validateNext(event) {
  //   if (this.imeiNumber !== undefined) {
  //     if (this.imeiNumber.length === 0) {
  //       this.nonAttImeiReqErr = true;
  //     } else {
  //       this.nonAttImeiReqErr = false;
  //     }

  //     if (this.imeiNumber.length < 15) {
  //       this.isInvalid = true;
  //     }

  //     if (this.imeiNumber.length === 15) {
  //       this.isInvalid = false;
  //       this.preloader.start();
  //       this.unlockService.imeiMakeModelResponse(this.imeiNumber).subscribe(
  //         (data: any) => {
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
}
