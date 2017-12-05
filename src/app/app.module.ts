import { ConfirmationComponent } from './customer-type-canvas/confirmation/confirmation.component';
import { UnlockService } from './common/services/unlock.service';
import { FormsModule } from '@angular/forms';
import { CityComponent } from './city/city.component';
import { WorkerAppModule } from '@angular/platform-webworker';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CityWeatherResolverService } from './city-weather-resolver.service';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './common/layout.module';
import { AppState } from './common/services/app.service';
import { PreloaderService } from './common/services/preloader.service';
import { AccountInformationComponent } from './customer-type-canvas/account-information/account-information.component';
import { ModalService } from './common/modal/modal.service';
import { AccountIEMIInformationComponent } from './customer-type-canvas/account-imei-information/account-imei-information.component';
import { StepIndicatorComponent } from './customer-type-canvas/step-indicator/step-indicator.component';
import { ImeiContactInfoComponent } from './customer-type-canvas/imei-contact-info/imei-contact-info.component';
import { UnlockStatusConfirmationComponent } from "./unlock-status/unlock-status-confirmation/unlock-status-confirmation.component";
import { UnlockStatusService } from "./common/services/unlock-status.service";

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    HomeComponent,
    AccountInformationComponent,
    AccountIEMIInformationComponent,
    ConfirmationComponent,
    ImeiContactInfoComponent,
    UnlockStatusConfirmationComponent
    //StepIndicatorComponent
  ],
  imports: [
    WorkerAppModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    RouterModule.forRoot([
      {
        path: 'city/:city', component: CityComponent, resolve: { weather: CityWeatherResolverService }
      },
      { path: '', redirectTo: 'unlock-canvas', pathMatch: 'full' },
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule' },
      { path: 'unlock-canvas', loadChildren: './unlock-canvas/unlock-canvas.module#UnlockCanvasModule' },
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
    CityWeatherResolverService,
    PreloaderService, ModalService, UnlockService, UnlockStatusService, 
    AppState],
  bootstrap: [AppComponent]
})
export class AppModule { }
