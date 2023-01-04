import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  throwError
} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserAuthModel, UserModel} from 'src/app/core/models/user.model';
import {environment} from "../../../../../environment/environment";
import {ErrorService} from "../error/error.service";
import {ApiService} from "../api/api.service";
import {JwtService} from "../jwt/jwt.service";
import {AuthRequest} from "../../models/auth-request.model";
import {catchError} from "rxjs/operators";
import {ErrorModel} from "../../models/error.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<UserAuthModel | null>;
  public user: Observable<UserAuthModel | null>;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private errorService: ErrorService,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(credentials: AuthRequest) {
    return this.apiService.post('/auth/login', credentials)
      .pipe(map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  private errorHandler(error: ErrorModel) {
    if (error) {
      this.errorService.handle(error)
      return throwError(() => error)
    }
    return throwError(() => "")
  }

}
