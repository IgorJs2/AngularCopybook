import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotPageComponent} from "./forgot-page.component";
import {CustomTranslateModule} from "../../../core/pipes/custom-translate/custom-translate.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ForgotRoutingModule} from "./forgot-routing.module";
import {CoreModule} from "../../../core/core.module";
import {ToastModule} from "../../../shared/ui/toast/toast.module";
import {LanguageBlockModule} from "../../../shared/ui/language-block/language-block.module";


@NgModule({
  declarations: [
    ForgotPageComponent
  ],
  imports: [
    CommonModule,
    CustomTranslateModule,
    ReactiveFormsModule,
    CoreModule,
    ToastModule,
    LanguageBlockModule
  ],
  exports: [
    ForgotRoutingModule
  ]
})
export class ForgotPageModule {
}
