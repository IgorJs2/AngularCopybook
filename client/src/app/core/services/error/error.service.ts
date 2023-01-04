import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ErrorModel} from "../../models/error.model";
import {NotificationService} from "../notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error$ = new Subject<ErrorModel>()

  constructor(
    private notificationService: NotificationService
  ) { }

  handle(error: ErrorModel) {
    if(error){
      this.notificationService.error(error.message)
      this.error$.next(error)
    }
  }

  clear() {
    this.error$.next({} as ErrorModel)
  }

}
