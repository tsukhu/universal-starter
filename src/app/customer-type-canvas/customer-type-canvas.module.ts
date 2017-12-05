import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppState } from '../common/services/app.service';
import { CommonModule } from "@angular/common";
import { CustomerTypeCanvasComponent } from './index';
import { UnlockService } from '../common/services/unlock.service';
import { ModalComponent } from '../common/modal/index';
import { ModalService } from '../common/modal/modal.service';
import { EligibleUnlockComponent } from '../common/eligible-unlock/index';
/*  */
import { WirelessNumberComponent } from "./wireless-number/index";
import { StepIndicatorComponent } from "./step-indicator/index";
import { AccountInformationComponent } from "./account-information/index";
import { ConfirmationComponent } from "./confirmation/index";
/*  */
import { FormsModule } from '@angular/forms';
import { recaptcha } from '../common/recaptcha/recaptcha.component';

@NgModule({
  declarations: [CustomerTypeCanvasComponent, 
     StepIndicatorComponent,
     WirelessNumberComponent,
     recaptcha,
    // AccountInformationComponent, 
    // ConfirmationComponent, 
    ModalComponent, EligibleUnlockComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: CustomerTypeCanvasComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    UnlockService,
    ModalService
  ]
})
export class CustomerTypeCanvasModule {

}