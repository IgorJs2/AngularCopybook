import {Injectable} from '@angular/core';
import {LanguageService} from "../language/language.service";
import {BehaviorSubject, Subject} from "rxjs";
import {INotification, NotificationType} from "../../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private language: LanguageService,
  ) {
  }

  private notification$: Subject<INotification> = new BehaviorSubject({} as INotification);

  success(message: string, duration: number = 1000) {
    this.notify(message, NotificationType.Success, duration);
  }

  warning(message: string, duration: number = 2000) {
    this.notify(message, NotificationType.Warning, duration);
  }

  error(message: string, duration: number = 2500) {
    this.notify(message, NotificationType.Error, duration);
  }

  private notify(message: string, type: NotificationType, duration: number) {
    duration = !duration ? 3000 : duration;
    this.notification$.next({
      message: message,
      type: type,
      duration: duration
    } as INotification);
  }

  get notification() {
    return this.notification$.asObservable();
  }

}
