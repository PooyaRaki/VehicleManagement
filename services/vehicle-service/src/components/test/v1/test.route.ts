import { Request, Response } from "@utils/types";
import { Router } from "@app/router";
import { TaskController } from "./test.controller";

const router = Router();

router.get("/", async (_: Request, response: Response): Promise<void> => {
  const controller = new TaskController();
  const result = await controller.whoami();

  response.send(result);
});

router.get("/me", async (_: Request, response: Response): Promise<void> => {
  const controller = new TaskController();
  const result = await controller.me();

  response.send(result);
});

export default router;
