import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {W404PageComponent} from "./w404-page.component";
import {W404RoutingModule} from "./w404-routing.module";



@NgModule({
  declarations: [
    W404PageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    W404RoutingModule
  ]
})
export class W404PageModule { }
