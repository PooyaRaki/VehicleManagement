export class TestService {
  public async whoami(): Promise<string> {
    return "this is who i am! V2";
  }

  public async me(): Promise<string> {
    return "this is me! V2";
  }
}
