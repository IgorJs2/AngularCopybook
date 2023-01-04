import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LanguageService} from "../../../core/services/language/language.service";
import {AuthService} from "../../../core/services/auth/auth-service.service";
import {ClassModel} from "../../../core/models/class.model";
import { UserModel } from 'src/app/core/models/user.model';
import {UserService} from "../../../core/services/user/user.service";

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.css']
})
export class ClassPageComponent implements OnInit{

  user: UserModel;
  classes: ClassModel[]

  constructor(
    public language: LanguageService,
    private router: Router,
    public authService: AuthService,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.get_user_profile().subscribe(value => {
      this.user = value.user || {} as UserModel
      this.classes = value.classes || [] as ClassModel[]
    })

    console.log(this.user)
    console.log(this.classes)
  }

}
