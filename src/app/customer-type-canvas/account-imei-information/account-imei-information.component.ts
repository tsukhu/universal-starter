import { UnlockService } from '../../common/services/unlock.service';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { PreloaderService } from '../../common/services/preloader.service';
import { AppStore } from '../../common/models/appstore.model';
import { UnlockData, ActionCart } from '../../common/models/unlock.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WirelessDetails } from '../../common/models/steps.model';
import { WirelessDetailsAction, AddRequestNumberAction } from '../../common/actions/user.actions';

@Component({
  selector: 'account-imei-information',
  templateUrl: 'account-imei-information.component.html',
  styleUrls: ['account-imei-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountIEMIInformationComponent implements OnInit {
  // @Input()
  public cms: Observable<UnlockData>;
  public wirelessNumber: string = undefined;
  public customerType: boolean = true;
  public imeiNumber = undefined;
  public showDeviceDetail: boolean = false;
  public isInvalid: boolean = true;
  public nonAttImeiReqErr: boolean = false;
  public deviceMake = undefined;
  public deviceModel = undefined;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private route: Router,

    private preloader: PreloaderService,
    private store: Store<AppStore>,
    private ref: ChangeDetectorRef) {
    this.cms = store.select('cms');
  }

  public ngOnInit() {
    const currentStore = this.unlockService.getCurrentState();
    if (
      currentStore.user !== undefined &&
      currentStore.user.wirelessDetails !== undefined
    ) {
      if (currentStore.user.wirelessDetails.customerType) {
        const details = currentStore.user.wirelessDetails;
        this.wirelessNumber = details.wirelessNumber;
        this.customerType = details.customerType;
      }
    }
  }

  public unlockNext() {
    this.unlockService.imeiOrderFlowSubmit().subscribe(
      (data: any) => {
        this.store.dispatch(new AddRequestNumberAction(
          data.orderFlowResponseDO.requestNo
        ));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public unlockPrevious() {
    this.route.navigate(['/unlockstep2']);
  }

  public validateNext(event) {
    if (this.imeiNumber !== undefined) {
      if (this.imeiNumber.length === 0) {
        this.nonAttImeiReqErr = true;
      } else {
        this.nonAttImeiReqErr = false;
      }

      if (this.imeiNumber.length < 15) {
        this.isInvalid = true;
      }

      if (this.imeiNumber.length === 15) {
        this.isInvalid = false;
        this.preloader.start();
        this.unlockService.imeiMakeModelResponse(this.imeiNumber).subscribe(
          (data: any) => {
            const respDo = data.orderFlowResponseDO;
            this.preloader.stop();
            const wirelessDetails: WirelessDetails = {
              wirelessNumber: this.wirelessNumber,
              customerType: this.customerType,
              imeiNumber: this.imeiNumber,
              make: respDo.make,
              model: respDo.model,
              imeiRefId: respDo.imeiRefId,
              makeRefId: respDo.makeRefId,
              modelRefId: respDo.modelRefId
            };
            this.store.dispatch(new WirelessDetailsAction(wirelessDetails));
            this.deviceMake = respDo.make;
            this.deviceModel = respDo.model;
            this.ref.detectChanges();
            this.showDeviceDetail = true;
          },
          (error) => {
            console.log(error);
            this.preloader.stop();
          }
        );
      }
    }
  }
}
