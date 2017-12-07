import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { UnlockService } from '../../common/services/unlock.service';
import { AppState } from '../../common/services/app.service';

@Component({
  selector: 'unlock-status-confirmation',
  templateUrl: 'unlock-status-confirmation.component.html',
  styleUrls: ['unlock-status-confirmation.component.scss']
})
export class UnlockStatusConfirmationComponent implements OnInit, OnDestroy {
  @Input() public cms;

  public orderStatus: any;
  public imeiNumber;
  private subscriptionOrder: ISubscription;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private appState: AppState,
    private route: ActivatedRoute
  ) {
    this.imeiNumber = this.route.snapshot.params['imeiNumber'];
  }

  public ngOnInit() {
    this.cms = this.appState.get('unlockDevice');
    this.subscriptionOrder = this.unlockService
      .unlockOrderStatus()
      .subscribe((data: any) => {
        this.orderStatus = data.oceUnlockOrderStatusDO;
      });
  }

  public ngOnDestroy() {
    if (this.subscriptionOrder) {
      this.subscriptionOrder.unsubscribe();
    }
  }
}
