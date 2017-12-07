import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { UnlockService } from '../../common/services/unlock.service';

@Component({
  selector: 'unlock-status-confirmation',
  templateUrl: 'unlock-status-confirmation.component.html',
  styleUrls: ['unlock-status-confirmation.component.scss']
})
export class UnlockStatusConfirmationComponent implements OnInit, OnDestroy {
  @Input() public cms;

  public orderStatus: any;
  public imeiNumber;
  private subscriptionUnlock: ISubscription;
  private subscriptionOrder: ISubscription;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private route: ActivatedRoute
  ) {
    this.imeiNumber = this.route.snapshot.params['imeiNumber'];
  }

  public ngOnInit() {
    this.subscriptionUnlock = this.unlockService
      .UnlockDevice()
      .subscribe((data: any) => {
        this.cms = data;
      });
    this.subscriptionOrder = this.unlockService
      .unlockOrderStatus()
      .subscribe((data: any) => {
        this.orderStatus = data.oceUnlockOrderStatusDO;
      });
  }

  public ngOnDestroy() {
    if (this.subscriptionUnlock) {
      this.subscriptionUnlock.unsubscribe();
    }
    if (this.subscriptionOrder) {
      this.subscriptionOrder.unsubscribe();
    }
  }
}
