import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../common/modal/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../common/layout.module';
import { UnlockService } from '../../common/services/unlock.service';
import { AccountInformationComponent } from './account-information.component';

@NgModule({
  declarations: [AccountInformationComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AccountInformationComponent, pathMatch: 'full' }
    ])
  ],
  providers: [ModalService, UnlockService]
})
export class AccountInformationModule {}