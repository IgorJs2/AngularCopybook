
import {ClassModel} from "./class.model";

export class UserModel{
  public classes: ClassModel[];
  public _id: string;
  public email: string;
  public login: string;
  public role: string;
  public nb_of_classes: number;
}

export class UserAuthModel {
  public userId: string;
  public login: string;
  public role: string;
  public token: string;
}
