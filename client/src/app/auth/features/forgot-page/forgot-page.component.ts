import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {LanguageService} from "../../../core/services/language/language.service";

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.css']
})
export class ForgotPageComponent implements OnInit, OnDestroy{

  forgotForm: FormGroup;
  subscription: Subscription;


  constructor(public language: LanguageService) {
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
