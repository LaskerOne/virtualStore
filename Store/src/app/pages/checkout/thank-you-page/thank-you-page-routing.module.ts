import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThankYouPageComponent } from './thank-you-page.component';

const routes: Routes = [{ path: '', component: ThankYouPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankYouPageRoutingModule { }
