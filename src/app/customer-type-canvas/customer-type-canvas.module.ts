import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppState } from '../common/services/app.service';
import { CommonModule } from "@angular/common";
import { CustomerTypeCanvasComponent } from './index';
import { UnlockService } from '../common/services/unlock.service';
import { StepIndicatorComponent } from './step-indicator/index';
import { FormPanelComponent } from './form-panel/index';
import { NavigatePanelComponent } from './navigate-panel/index';
import { ModalComponent } from '../common/modal/index';
import { ModalService } from '../common/modal/modal.service';
import { EligibleUnlockComponent } from '../common/eligible-unlock/index';

@NgModule({
  declarations: [CustomerTypeCanvasComponent, StepIndicatorComponent, FormPanelComponent, NavigatePanelComponent, ModalComponent, EligibleUnlockComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CustomerTypeCanvasComponent, pathMatch: 'full' }
    ])
  ],
  providers: [
    UnlockService,
    ModalService
  ]
})
export class CustomerTypeCanvasModule {

}