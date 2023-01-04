import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../../core/services/language/language.service";
import {AuthService} from "../../../core/services/auth/auth-service.service";
import {UserService} from "../../../core/services/user/user.service";
import {UserModel} from "../../../core/models/user.model";
import {ClassModel} from "../../../core/models/class.model";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ClassService} from "../../data-access/class.service";

@Component({
  selector: 'app-class-connect-page',
  templateUrl: './class-connect-page.component.html',
  styleUrls: ['./class-connect-page.component.css']
})
export class ClassConnectPageComponent implements OnInit{

  user: UserModel;
  classes: ClassModel[]

  connectForm: FormGroup;

  loading: boolean = false;

  constructor(
    public language: LanguageService,
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
    private classService: ClassService
  ) {
  }

  onSubmit(){
    this.loading = true
    this.classService.connect(this.connectForm.value.code).subscribe(
      value => this.loading = false
    )
  }

  ngOnInit(): void {
    this.userService.get_user_profile().subscribe(value => {
      this.user = value.user || {} as UserModel
      this.classes = value.classes || [] as ClassModel[]
    })
    this.connectForm = new FormGroup({
      code: new FormControl("")
    })
  }
}
