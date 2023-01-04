import {Injectable} from '@angular/core';
import {ErrorModel} from "../../models/error.model";
import {BehaviorSubject, map, Observable, throwError} from "rxjs";
import {ApiService} from "../api/api.service";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "../jwt/jwt.service";
import {ErrorService} from "../error/error.service";
import {Router} from "@angular/router";
import {UserAuthModel, UserModel} from "../../models/user.model";
import {catchError} from "rxjs/operators";
import {ProfileResponse} from "../../models/profile-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private CurrentUserSubject: BehaviorSubject<ProfileResponse>;
  public current_user: Observable<ProfileResponse>;

  private UsersSubject: BehaviorSubject<UserModel[]>
  public users: Observable<UserModel[]>;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private errorService: ErrorService,
    private router: Router
  ) {
    this.CurrentUserSubject = new BehaviorSubject({} as ProfileResponse);
    this.current_user = this.CurrentUserSubject.asObservable();

    this.UsersSubject = new BehaviorSubject([] as UserModel[]);
    this.users = this.UsersSubject.asObservable();
  }

  public get getCurrentUserValue() {
    return this.CurrentUserSubject.value
  }

  public get getUsersValue() {
    return this.UsersSubject.value
  }

  get_user_profile(): Observable<ProfileResponse> {
    return this.apiService.post('/user/get_user', {id: JSON.parse(localStorage.getItem("user") || "{}").userId})
      .pipe(map(user => {
          this.CurrentUserSubject.next(user);
          return user;
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: ErrorModel) {
    if (error) {
      this.errorService.handle(error)
      return throwError(() => error)
    }
    return throwError(() => "")
  }
}
