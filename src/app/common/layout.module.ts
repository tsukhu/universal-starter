import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { StepIndicatorComponent } from "./step-indicator/index";

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
        StepIndicatorComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        StepIndicatorComponent
    ]
})
export class LayoutModule {
}
