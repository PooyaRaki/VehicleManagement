import { Router } from "@app/router";
import { SuccessResponse } from "@utils/helpers/response.helper";
import { Request, Response } from "express";
import { FeedController } from "./feed.controller";

const router = Router();

router.get("/save", async (_: Request, response: Response): Promise<void> => {
  const controller = new FeedController();

  await controller.save();

  response.send(SuccessResponse);
});

export default router;
