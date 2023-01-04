import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page.component";
import {CustomTranslateModule} from "../../../core/pipes/custom-translate/custom-translate.module";
import {LoginRoutingModule} from "./login-routing.module";
import {CoreModule} from "../../../core/core.module";
import {ToastModule} from "../../../shared/ui/toast/toast.module";
import {LanguageBlockModule} from "../../../shared/ui/language-block/language-block.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    CustomTranslateModule,
    CoreModule,
    ToastModule,
    LanguageBlockModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginRoutingModule
  ]
})
export class LoginPageModule { }
