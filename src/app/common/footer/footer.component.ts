import { Component } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { UnlockService } from "../services/unlock.service";

@Component({
    selector: 'app-footer',
    styleUrls: ['./footer.component.scss'],
    templateUrl: './footer.component.html',
})
export class FooterComponent {

  public cms: any;
  private subscription: ISubscription;

    constructor(private unlockService: UnlockService) { 
    this.subscription = this.unlockService.UnlockDevice().subscribe(
        (data: any) => {
            this.cms = data;
        }
        )
    }

    changeLanguage() {
        localStorage.unlockapplang = localStorage.unlockapplang=='es'?'en':'es';
        location.reload(true);
    }
}
