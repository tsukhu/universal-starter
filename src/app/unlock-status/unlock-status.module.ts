import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppState } from '../common/services/app.service';
import { CommonModule } from "@angular/common";
import { UnlockService } from '../common/services/unlock.service';
import { ModalComponent, ModalService } from '../common/modal/index';
import { EligibleUnlockComponent } from '../common/eligible-unlock/index';
import { AccountInformationComponent } from "./account-information/index";
import { ConfirmationComponent } from "./confirmation/index";
import { UnlockStatusComponent } from "./index";

@NgModule({
  declarations: [UnlockStatusComponent, AccountInformationComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UnlockStatusComponent, pathMatch: 'full' }
    ])
  ],
  providers: [
    UnlockService,
    ModalService
  ]
})
export class UnlockStatusModule {

}