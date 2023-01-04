import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageBlockComponent} from "./language-block.component";
import {CoreModule} from "../../../core/core.module";



@NgModule({
  declarations: [
    LanguageBlockComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    LanguageBlockComponent
  ]
})
export class LanguageBlockModule { }
