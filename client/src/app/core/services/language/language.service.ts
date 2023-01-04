import { Injectable } from '@angular/core';
import * as en_locale from '../../../../assets/ i18n/en.json'
import * as ua_locale from "../../../../assets/ i18n/ua.json"

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  private language: "en" | "ua" = "en"

  switchLanguage(value: "en" | "ua") {
    this.language = value
  }

  translateText(field: string){
    if(this.language === "en"){
      const language_json = JSON.parse(JSON.stringify(en_locale))
      return language_json[field]
    }
    if(this.language === "ua"){
      const language_json = JSON.parse(JSON.stringify(ua_locale))
      return language_json[field]
    }
    return "Translate Error";
  }

  getLanguage(){
    return this.language
  }

}
