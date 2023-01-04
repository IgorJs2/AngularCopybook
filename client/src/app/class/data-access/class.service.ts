import {Injectable} from '@angular/core';
import {ApiService} from "../../core/services/api/api.service";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "../../core/services/jwt/jwt.service";
import {ErrorService} from "../../core/services/error/error.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../core/services/notification/notification.service";
import {BehaviorSubject, map, Observable, throwError} from "rxjs";
import {ClassConnectResponse} from "../../core/models/class.model";
import {UserAuthModel} from "../../core/models/user.model";
import {catchError} from "rxjs/operators";
import {ErrorModel} from "../../core/models/error.model";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private errorService: ErrorService,
    private router: Router
  ) {
  }

  currentUserData = JSON.parse(localStorage.getItem("user") || "{}")

  connect(code: string): Observable<ClassConnectResponse> {
    return this.apiService.post('/class/connect_class', {code, student: this.currentUserData.userId})
      .pipe(map(response => {
        console.log(response)
          if (response.code == 200) {
            this.notificationService.success(response.message)
            return response
          }
          this.notificationService.warning(response.message)
          return response
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  disconnect(name: string): Observable<ClassConnectResponse> {
    return this.apiService.post('/class/disconnect_class', {name, student: this.currentUserData.userId})
      .pipe(map(response => {
          if (response.code == 200) {
            this.notificationService.success(response.message)
            return response
          }
          this.notificationService.warning(response.message)
          return response
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: ErrorModel) {
    console.log(error)
    if (error) {
      this.errorService.handle(error)
      return throwError(() => error)
    }
    return throwError(() => "")
  }

}
