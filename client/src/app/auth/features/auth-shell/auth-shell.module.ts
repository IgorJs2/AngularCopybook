import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthShellRoutingModule} from "./auth-shell-routing.module";
import {NoAuthGuard} from "../../../core/services/auth/no-auth-guard.service";
import {CoreModule} from "../../../core/core.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthShellRoutingModule,
    CoreModule
  ],
})
export class AuthShellModule { }
