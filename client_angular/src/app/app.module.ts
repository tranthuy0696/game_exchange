import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared/services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MzModalModule } from 'ngx-materialize'
import { MzButtonModule } from 'ngx-materialize'
import { AuthService } from "./shared/services/rest/auth.rest-service";
import { FileUploadService } from './shared/services/file-upload.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MzModalModule,
    MzButtonModule
  ],
  providers: [
    AuthGuard,
    AuthService, FileUploadService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
