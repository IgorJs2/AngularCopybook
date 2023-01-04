export class AuthLoginResponse {
    public token: string;
    public userId: string;
    public error?: string;
}

export class AuthCheckResponse{
  public authenticated: boolean
}
