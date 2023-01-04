import {UserModel} from "./user.model";

export class ClassModel{
  public _id: string
  public teacher: string
  public teacherLogin: string
  public code: string
  public name: string
  public nb_of_student: number
  public student: UserModel[]
}

export class ClassConnectRequest {
  public code: string
}

export class ClassDisconnectRequest {
  public code: string
}

export class ClassConnectResponse {
  public message: string
  public flag: string
}

export class ClassDisconnectResponse {
  public message: string
  public flag: string
}
