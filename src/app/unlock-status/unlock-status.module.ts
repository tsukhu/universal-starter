import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppState } from '../common/services/app.service';
import { CommonModule } from "@angular/common";
import { ModalComponent, ModalService } from '../common/modal/index';
import { EligibleUnlockComponent } from '../common/eligible-unlock/index';
import { AccountInformationComponent } from "./account-information/index";
import { UnlockStatusComponent } from "./index";
import { FormsModule } from "@angular/forms";
import { UnlockStatusService } from "../common/services/unlock-status.service";
import { LayoutModule } from "../common/layout.module";

@NgModule({
  declarations: [UnlockStatusComponent, AccountInformationComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    RouterModule.forChild([
      { path: '', component: UnlockStatusComponent, pathMatch: 'full' }
    ])
  ],
  providers: [
    ModalService,
    UnlockStatusService
  ]
})
export class UnlockStatusModule {

}