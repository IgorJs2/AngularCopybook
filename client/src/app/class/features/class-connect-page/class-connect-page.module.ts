import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassConnectPageComponent } from './class-connect-page.component';
import {LanguageBlockModule} from "../../../shared/ui/language-block/language-block.module";
import {CoreModule} from "../../../core/core.module";
import {ClassConnectRoutingModule} from "./class-connect-routing.module";
import {ClassDisconnectRoutingModule} from "../class-disconnect-page/class-disconnect-routing.module";
import {CustomTranslateModule} from "../../../core/pipes/custom-translate/custom-translate.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "../../../shared/ui/toast/toast.module";



@NgModule({
  declarations: [
    ClassConnectPageComponent
  ],
    imports: [
        CommonModule,
        LanguageBlockModule,
        CoreModule,
        ClassConnectRoutingModule,
        CustomTranslateModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule
    ],
  exports: [
    ClassConnectRoutingModule
  ]
})
export class ClassConnectPageModule { }
