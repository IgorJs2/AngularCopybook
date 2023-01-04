import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterPageComponent} from "./register-page.component";
import {CustomTranslateModule} from "../../../core/pipes/custom-translate/custom-translate.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {RegisterRoutingModule} from "./register-routing.module";
import {ToastModule} from "../../../shared/ui/toast/toast.module";
import {LanguageBlockModule} from "../../../shared/ui/language-block/language-block.module";



@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    CustomTranslateModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastModule,
    LanguageBlockModule
  ],
  exports: [
    RegisterRoutingModule,
  ]
})
export class RegisterPageModule { }
