import {Injectable, NgModule} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  PreloadAllModules,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router'
import {AuthGuard} from "./core/services/auth/auth-guard.service";
import {AppComponent} from "./app.component";
import {NoAuthGuard} from "./core/services/auth/no-auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: "auth/login",
    pathMatch: "full"
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth-shell/auth-shell.module').then(m => m.AuthShellModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'class',
    loadChildren: () => import('./class/features/class-shell/class-shell.module').then(m => m.ClassShellModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./shared/pages/w404-page/w404-page.module').then(m => m.W404PageModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
