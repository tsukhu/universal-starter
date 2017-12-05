import { Component, ElementRef , Input } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { Element } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'eligible-unlock',
  styleUrls: ['./eligible-unlock.component.scss'],
  templateUrl: './eligible-unlock.component.html'
})

export class EligibleUnlockComponent {
  @Input() public modalContent: Observable<any>;

  el;
  constructor(public modalService: ModalService,
   public elementRef: ElementRef
  ) {
    this.el = elementRef.nativeElement;
  }

  public close(e) {
    this.modalService.closeModalByChildElement(this.el);
  }

}
