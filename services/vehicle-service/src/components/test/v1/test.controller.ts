import { Get, Post, Route } from "tsoa";

@Route('task')
export class TaskController {
  @Get('/whoami')
  public async whoami(): Promise<string> {
    return "this is who i am!";
  }

  @Post('/create')
  /**
   * @summary Creates a new test
   *
   * @returns {Promise<string>}
   */
  public async create(): Promise<string> {
    return "Create a task!";
  }

  public async me (): Promise<string> {
    return "this is me!";
  }
}