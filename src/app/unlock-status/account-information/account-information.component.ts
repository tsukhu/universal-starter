import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { UnlockService } from '../../common/services/unlock.service';
import { AppState } from '../../common/services/app.service';

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.scss']
})
export class AccountInformationComponent implements OnInit, OnDestroy {
  public cms: any;

  public imeiNumber: string = undefined;
  public requestNumber: string = undefined;
  public nonAttImeiReqErr: boolean = false;
  public nonAttReqNoErr: boolean = false;
  public isInvalid: boolean = true;
  private subscriptionCaptcha: ISubscription;
  constructor(
    public modalService: ModalService,
    private route: Router,
    private appState: AppState,
    private unlockService: UnlockService
  ) {

    this.cms = this.appState.get('unlockDevice');
  }

  public ngOnInit() {
    /** TODO */
  }

  public modalClosed(e) {
    /** TODO */
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
        (error) => {
          console.log('error', error);
        }
      );
  }
  public unlockPrevious() {
    this.route.navigate(['/unlock-canvas']);
  }
}
