import {UserModel} from "./user.model";
import {ClassModel} from "./class.model";

export class ProfileResponse {
  public user?: UserModel;
  public classes?: ClassModel[];
}
