import { Router } from "@app/router";
import { Request, Response } from "@utils/types";
import { PriceController } from "./price.controller";

const router = Router();

router.get("/", async (_: Request, response: Response): Promise<void> => {
  const controller = new PriceController();

  const result = await controller.fetch();

  response.send(result);
});

export default router;
