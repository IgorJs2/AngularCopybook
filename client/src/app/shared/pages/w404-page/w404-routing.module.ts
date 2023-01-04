import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NoAuthGuard} from "../../../core/services/auth/no-auth-guard.service";
import {NgModule} from "@angular/core";
import {W404PageComponent} from "./w404-page.component";

const routes: Routes = [
  {
    path: '',
    component: W404PageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class W404RoutingModule {
}
