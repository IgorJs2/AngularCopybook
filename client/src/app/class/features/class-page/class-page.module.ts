import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassPageComponent} from "./class-page.component";
import {ClassRoutingModule} from "./class-routing.module";
import {CustomTranslateModule} from "../../../core/pipes/custom-translate/custom-translate.module";
import {CoreModule} from "../../../core/core.module";
import {LanguageBlockModule} from "../../../shared/ui/language-block/language-block.module";
import {ClassListModule} from "../class-list/class-list.module";
import {ClassConnectPageModule} from "../class-connect-page/class-connect-page.module";
import {ClassDisconnectPageModule} from "../class-disconnect-page/class-disconnect-page.module";



@NgModule({
  declarations: [
    ClassPageComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    ClassListModule,
    CustomTranslateModule,
    CoreModule,
    LanguageBlockModule,
    ClassConnectPageModule,
    ClassDisconnectPageModule
  ],
  exports: [
    ClassRoutingModule
  ]
})
export class ClassPageModule { }
