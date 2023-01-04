import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassDisconnectPageComponent } from './class-disconnect-page.component';
import {LanguageBlockModule} from "../../../shared/ui/language-block/language-block.module";
import {CoreModule} from "../../../core/core.module";
import {ClassDisconnectRoutingModule} from "./class-disconnect-routing.module";
import {ClassRoutingModule} from "../class-page/class-routing.module";
import {CustomTranslateModule} from "../../../core/pipes/custom-translate/custom-translate.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "../../../shared/ui/toast/toast.module";



@NgModule({
  declarations: [
    ClassDisconnectPageComponent
  ],
    imports: [
        CommonModule,
        LanguageBlockModule,
        CoreModule,
        ClassDisconnectRoutingModule,
        CustomTranslateModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule
    ],
  exports: [
    ClassDisconnectRoutingModule
  ]
})
export class ClassDisconnectPageModule { }
