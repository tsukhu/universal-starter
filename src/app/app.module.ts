import { ConfirmationComponent } from './customer-type-canvas/confirmation/confirmation.component';
import { UnlockService } from './common/services/unlock.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutModule } from './common/layout.module';
import { AppState } from './common/services/app.service';
import { PreloaderService } from './common/services/preloader.service';
import { AccountInformationComponent } from './customer-type-canvas/account-information/account-information.component';
import { ModalService } from './common/modal/modal.service';
import { UnlockCanvasComponent } from './unlock-canvas/unlock-canvas.component';
import { UnlockCanvasModule } from './unlock-canvas/unlock-canvas.module';
import { AccountIEMIInformationComponent } from './customer-type-canvas/account-imei-information/account-imei-information.component';
import { ImeiContactInfoComponent } from './customer-type-canvas/imei-contact-info/imei-contact-info.component';
import { UnlockStatusConfirmationComponent } from "./unlock-status/unlock-status-confirmation/unlock-status-confirmation.component";
import { UnlockStatusService } from "./common/services/unlock-status.service";

@NgModule({
  declarations: [
    AppComponent,
    AccountInformationComponent,
    AccountIEMIInformationComponent,
    ConfirmationComponent,
    ImeiContactInfoComponent,
    UnlockCanvasComponent,
    UnlockStatusConfirmationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-demo-transfer-state-app' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserTransferStateModule,
    LayoutModule,
    UnlockCanvasModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'unlock-canvas', pathMatch: 'full' },
      { path: 'unlock-canvas', component: UnlockCanvasComponent },
      { path: 'device-unlock', loadChildren: './customer-type-canvas/customer-type-canvas.module#CustomerTypeCanvasModule' },
      { path: 'unlock-status', loadChildren: './unlock-status/unlock-status.module#UnlockStatusModule' },
      { path: 'unlockstep2', component: AccountInformationComponent},
      { path: 'unlockstep3', component: AccountIEMIInformationComponent },
      { path: 'unlockConfirm', component: ConfirmationComponent },
      { path: 'nonattunlock', component: ImeiContactInfoComponent},
      { path: 'unlock-status-confirm', component: UnlockStatusConfirmationComponent },
    ], { useHash: true })
  ],
  providers: [
    PreloaderService, ModalService, UnlockService, UnlockStatusService, 
    AppState],
  bootstrap: [AppComponent]
})
export class AppModule { }
