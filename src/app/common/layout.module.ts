import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { StepIndicatorComponent } from "./step-indicator/index";
import { recaptcha } from "./recaptcha/recaptcha.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    providers: [
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        StepIndicatorComponent,
        recaptcha
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        StepIndicatorComponent,
        recaptcha
    ]
})
export class LayoutModule {
}
