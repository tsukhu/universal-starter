import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { UnlockService } from '../../common/services/unlock.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AppStore } from '../../common/models/appstore.model';
import { UnlockData, ActionCart } from '../../common/models/unlock.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  public cms: Observable<UnlockData>;
  public requestNo: string = undefined;
  public cust;
  public customerType: boolean;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>
  ) {
    this.cms = store.select('cms');
    this.cust = this.route.snapshot.params['customerType'];
    if (this.cust === 'true') {
      this.customerType = true;
    } else {
      this.customerType = false;
    }
  }

  public ngOnInit() {

    this.unlockService.confirmation().subscribe((data: any) => {
      // this.requestNo = "ABC";
      this.requestNo = data.orderFlowResponseDO.requestNo;
    });
  }
}
