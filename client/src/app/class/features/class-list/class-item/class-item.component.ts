import {Component, Input} from '@angular/core';
import {UserModel} from "../../../../core/models/user.model";
import {LanguageService} from "../../../../core/services/language/language.service";
import {ClassModel} from "../../../../core/models/class.model";


@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.css']
})
export class ClassItemComponent {
  @Input() user: UserModel
  @Input() language: LanguageService
  @Input() class: ClassModel
}
