import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../../core/services/auth/auth-service.service";
import {LanguageService} from "../../../core/services/language/language.service";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscription: Subscription;
  loading: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              public language: LanguageService,
              public notification: NotificationService
    ) {}


  onSubmit() {
    this.loading = true
    this.authService.login(this.loginForm.value).subscribe((data) => {
      this.loading = false
      window.location.reload()
    })
  }

  ngOnInit() {
    this.loading = false;
    this.loginForm = new FormGroup({
      login: new FormControl(""),
      password: new FormControl("")
    });
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
