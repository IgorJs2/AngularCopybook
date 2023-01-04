import {Pipe, PipeTransform} from '@angular/core';
import * as en_locale from '../../../../assets/ i18n/en.json'
import * as ua_locale from "../../../../assets/ i18n/ua.json"

@Pipe({
  name: 'customTranslate'
})
export class CustomTranslatePipe implements PipeTransform {



  transform(field: string, language: "en" | "ua"): string {
    if(language === "en"){
      const language_json = JSON.parse(JSON.stringify(en_locale))
      return language_json[field]
    }
    if(language === "ua"){
      const language_json = JSON.parse(JSON.stringify(ua_locale))
      return language_json[field]
    }
    return "Translate Error";
  }

}
