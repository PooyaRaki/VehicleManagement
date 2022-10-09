import { Request, Response } from "@utils/types";
import { Router } from "@app/router";
import { TestService } from "./test.service";

const router = Router();

router.get("/", async (_: Request, response: Response) => {
  const result = await new TestService().whoami();

  response.send(result);
});

router.get("/me", async (_: Request, response: Response) => {
  const result = await new TestService().me();

  response.send(result);
});

export default router;
