import { Component } from '@angular/core';
import {LanguageService} from "../../../core/services/language/language.service";

@Component({
  selector: 'app-language-block',
  templateUrl: './language-block.component.html',
  styleUrls: ['./language-block.component.css']
})
export class LanguageBlockComponent {

  constructor(public languageService: LanguageService) {
  }

}
