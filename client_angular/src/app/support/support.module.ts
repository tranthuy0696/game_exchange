import { NgModule } from "@angular/core";
import { SupportComponent } from "./support.component";
import { SupportRoutingModule } from "./support-routing.module";

@NgModule({
  declarations: [
    SupportComponent
  ],
  exports: [],
  imports: [
    SupportRoutingModule
  ],
  providers: []
})
export class SupportModule { }
