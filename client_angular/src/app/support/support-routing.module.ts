import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../shared/services/auth-guard.service";
import { SupportComponent } from './support.component';

const routes: Routes = [
  { path: '', component: SupportComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportRoutingModule { }