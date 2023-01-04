import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomTranslatePipe} from "./pipes/custom-translate/custom-translate.pipe";
import {AuthService} from "./services/auth/auth-service.service";
import {JwtService} from "./services/jwt/jwt.service";
import {ErrorService} from "./services/error/error.service";
import {LanguageService} from "./services/language/language.service";
import {ApiService} from "./services/api/api.service";
import {NotificationService} from "./services/notification/notification.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./services/auth/auth-guard.service";
import {NoAuthGuard} from "./services/auth/no-auth-guard.service";
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import {UserService} from "./services/user/user.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthService,
    JwtService,
    ErrorService,
    LanguageService,
    ApiService,
    NotificationService,
    AuthGuard,
    NoAuthGuard,
    UserService
  ]
})
export class CoreModule {
}
