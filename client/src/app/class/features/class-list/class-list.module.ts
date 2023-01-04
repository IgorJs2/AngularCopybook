import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomTranslateModule} from "../../../core/pipes/custom-translate/custom-translate.module";
import {CoreModule} from "../../../core/core.module";
import {LanguageBlockModule} from "../../../shared/ui/language-block/language-block.module";
import {ClassListComponent} from "./class-list.component";
import {ClassItemComponent} from "./class-item/class-item.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ClassListComponent,
    ClassItemComponent
  ],
  imports: [
    CommonModule,
    CustomTranslateModule,
    CoreModule,
    RouterModule,
  ],
  exports: [
    ClassListComponent,
    ClassItemComponent
  ]
})
export class ClassListModule { }
