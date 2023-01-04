import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastComponent} from "./toast.component";
import {CoreModule} from "../../../core/core.module";



@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    ToastComponent
  ]
})
export class ToastModule { }
