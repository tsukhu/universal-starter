import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { UnlockService } from '../services/unlock.service';
import { ModalService } from '../modal/modal.service';
import { Element } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import { UnlockData, ActionCart } from '../models/unlock.model';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'eligible-unlock',
  styleUrls: ['./eligible-unlock.component.scss'],
  templateUrl: './eligible-unlock.component.html'
})
export class EligibleUnlockComponent implements OnDestroy {
  @Input() public modalContent: UnlockData;

  public el;
  private subscription: ISubscription;
  constructor(
    private unlockService: UnlockService,
    public modalService: ModalService,
    public elementRef: ElementRef
  ) {
    this.el = elementRef.nativeElement;
    this.subscription = this.unlockService
      .UnlockDevice()
      .subscribe((data: any) => {
        this.modalContent = data;
      });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public close(e) {
    this.modalService.closeModalByChildElement(this.el);
  }
}
