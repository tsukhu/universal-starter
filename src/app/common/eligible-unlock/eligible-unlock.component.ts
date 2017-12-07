import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { UnlockService } from '../services/unlock.service';
import { ModalService } from '../modal/modal.service';
import { Element } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import { UnlockData, ActionCart } from '../models/unlock.model';
import { AppState } from '../services/app.service';

@Component({
  selector: 'eligible-unlock',
  styleUrls: ['./eligible-unlock.component.scss'],
  templateUrl: './eligible-unlock.component.html'
})
export class EligibleUnlockComponent {
  @Input() public modalContent: UnlockData;

  public el;
  constructor(
    private unlockService: UnlockService,
    private appState: AppState,
    public modalService: ModalService,
    public elementRef: ElementRef
  ) {
    this.el = elementRef.nativeElement;
    this.modalContent = this.appState.get('unlockDevice');
  }

  public close(e) {
    this.modalService.closeModalByChildElement(this.el);
  }
}
