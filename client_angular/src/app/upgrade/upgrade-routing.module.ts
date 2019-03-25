import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../shared/services/auth-guard.service";
import { UpgradeComponent } from './upgrade.component';

const routes: Routes = [
  { path: '', component: UpgradeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeRoutingModule { }