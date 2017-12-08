import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { UnlockService } from '../../common/services/unlock.service';
import { AppStore } from '../../common/models/appstore.model';
import { UnlockData, ActionCart } from '../../common/models/unlock.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInformationComponent implements OnDestroy {
  public cms: Observable<UnlockData>;

  public imeiNumber: string = undefined;
  public requestNumber: string = undefined;
  public nonAttImeiReqErr: boolean = false;
  public nonAttReqNoErr: boolean = false;
  public isInvalid: boolean = true;
  private subscriptionCaptcha: ISubscription;
  constructor(
    public modalService: ModalService,
    private route: Router,
    private unlockService: UnlockService,
    private store: Store<AppStore>
  ) {
    this.cms = store.select('cms');
  }

  public ngOnDestroy() {
    if (this.subscriptionCaptcha !== undefined) {
      this.subscriptionCaptcha.unsubscribe();
    }
  }
  public validateNext(event) {
    if (this.imeiNumber !== undefined && this.imeiNumber.length === 0) {
      this.nonAttImeiReqErr = true;
    } else {
      this.nonAttImeiReqErr = false;
    }
    if (this.requestNumber !== undefined && this.requestNumber.length === 0) {
      this.nonAttReqNoErr = true;
    } else {
      this.nonAttReqNoErr = false;
    }
    if (
      this.requestNumber !== undefined &&
      this.requestNumber.length === 10 &&
      (this.imeiNumber !== undefined && this.imeiNumber.length === 15)
    ) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }

  public unlockNext() {
    this.route.navigate([
      '/unlock-status-confirm',
      { imeiNumber: this.imeiNumber }
    ]);
  }

  public getToken(event) {
    this.subscriptionCaptcha = this.unlockService
      .verifyCaptcha(event.token)
      .subscribe(
        (data: any) => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        }
      );
  }
  public unlockPrevious() {
    this.route.navigate(['/unlock-canvas']);
  }
}
