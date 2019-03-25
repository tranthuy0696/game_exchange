import { NgModule } from "@angular/core";
import { UpgradeRoutingModule } from "./upgrade-routing.module";
import { UpgradeComponent } from "./upgrade.component";

@NgModule({
  declarations: [
    UpgradeComponent
  ],
  exports: [],
  imports: [
    UpgradeRoutingModule
  ],
  providers: []
})
export class UpgradeModule { }
