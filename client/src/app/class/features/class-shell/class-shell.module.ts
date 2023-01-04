import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoAuthGuard} from "../../../core/services/auth/no-auth-guard.service";
import {CoreModule} from "../../../core/core.module";
import {ClassShellRoutingModule} from "./class-shell-routing.module";
import {ClassConnectRoutingModule} from "../class-connect-page/class-connect-routing.module";
import {ClassDisconnectRoutingModule} from "../class-disconnect-page/class-disconnect-routing.module";
import {ClassService} from "../../data-access/class.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClassShellRoutingModule,
    ClassConnectRoutingModule,
    ClassDisconnectRoutingModule,
    CoreModule
  ],
  providers: [
    ClassService
  ]
})
export class ClassShellModule { }
