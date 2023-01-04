import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {LanguageService} from "../../../core/services/language/language.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  title = new FormControl();

    constructor(public language: LanguageService) {
    }

}
