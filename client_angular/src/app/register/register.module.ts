import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {RegisterComponent} from "./register.component";
import {RegisterRoutingModule} from "./register-routing.module";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  exports: [],
  imports: [
    RegisterRoutingModule,
    CommonModule
  ],
  providers: []
})
export class RegisterModule { }
