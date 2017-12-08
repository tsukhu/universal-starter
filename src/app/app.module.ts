import { ConfirmationComponent } from './customer-type-canvas/confirmation/confirmation.component';
import { UnlockService } from './common/services/unlock.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutModule } from './common/layout.module';
import { PreloaderService } from './common/services/preloader.service';
// tslint:disable-next-line:max-line-length
import { AccountInformationComponent } from './customer-type-canvas/account-information/account-information.component';
import { ModalService } from './common/modal/modal.service';
import { UnlockCanvasComponent } from './unlock-canvas/unlock-canvas.component';
import { UnlockCanvasModule } from './unlock-canvas/unlock-canvas.module';
// tslint:disable-next-line:max-line-length
import { AccountIEMIInformationComponent } from './customer-type-canvas/account-imei-information/account-imei-information.component';
// tslint:disable-next-line:max-line-length
import { ImeiContactInfoComponent } from './customer-type-canvas/imei-contact-info/imei-contact-info.component';
// tslint:disable-next-line:max-line-length
import { UnlockStatusConfirmationComponent } from './unlock-status/unlock-status-confirmation/unlock-status-confirmation.component';
import { StartupService } from './common/services/startupService';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { cmsReducer, cmsInitialState } from './common/reducers/cms.reducer';

// tslint:disable-next-line:ban-types
export function startupServiceFactory(
  startupService: StartupService
  // tslint:disable-next-line:ban-types
): Function {
  return () => startupService.load();
}
/*
export function instrumentOptions() {
  return {
    monitor: useLogMonitor({ visible: false, position: 'right' }),
    maxAge: 25
  };
}
*/
@NgModule({
  declarations: [
    AppComponent,
    AccountInformationComponent,
    AccountIEMIInformationComponent,
    ConfirmationComponent,
    ImeiContactInfoComponent,
    UnlockCanvasComponent,
    UnlockStatusConfirmationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-demo-transfer-state-app' }),
    HttpClientModule,
    FormsModule,
    BrowserTransferStateModule,
    LayoutModule,
    UnlockCanvasModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'unlock-canvas', pathMatch: 'full' },
        { path: 'unlock-canvas', component: UnlockCanvasComponent },
        {
          path: 'device-unlock',
          loadChildren:
            './customer-type-canvas/customer-type-canvas.module#CustomerTypeCanvasModule'
        },
        {
          path: 'unlock-status',
          loadChildren:
            './unlock-status/unlock-status.module#UnlockStatusModule'
        },
        { path: 'unlockstep2', component: AccountInformationComponent },
        { path: 'unlockstep3', component: AccountIEMIInformationComponent },
        { path: 'unlockConfirm', component: ConfirmationComponent },
        { path: 'nonattunlock', component: ImeiContactInfoComponent },
        {
          path: 'unlock-status-confirm',
          component: UnlockStatusConfirmationComponent
        }
      ],
      { useHash: true }
    ),
    StoreModule.forRoot({ cms: cmsReducer })
    /*,
    StoreDevtoolsModule.instrument(instrumentOptions),
    StoreLogMonitorModule*/
  ],
  providers: [
    HttpClientModule,
    PreloaderService,
    ModalService,
    StartupService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
