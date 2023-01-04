import {Component, Input} from '@angular/core';
import {UserModel} from "../../../core/models/user.model";
import {LanguageService} from "../../../core/services/language/language.service";
import {ClassModel} from "../../../core/models/class.model";


@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {
  @Input() user: UserModel
  @Input() language: LanguageService
  @Input() classes: ClassModel[]


}
