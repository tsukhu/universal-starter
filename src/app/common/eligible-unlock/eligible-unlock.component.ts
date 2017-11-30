import { Component, ElementRef } from '@angular/core';
import { UnlockService } from '../services/unlock.service';
import { ModalService } from '../modal/modal.service';
import { Element } from '@angular/compiler';


@Component({
  selector: 'eligible-unlock',
  styleUrls: ['./eligible-unlock.component.scss'],
  templateUrl: './eligible-unlock.component.html'
})

export class EligibleUnlockComponent {
  modalContent: any;
  el;
  constructor(private unlockService: UnlockService,
   public modalService: ModalService,
   public elementRef: ElementRef
  ) {
    this.el = elementRef.nativeElement;
    this.unlockService.UnlockDevice().subscribe(
      (data: any) => {
        this.modalContent = data.unlockPortalLabelAndErrorObj[0];
      }
    )
  }

  public close(e) {
    this.modalService.closeModalByChildElement(this.el);
  }

}
