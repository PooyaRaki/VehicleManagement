import { Request, Response } from "@utils/types";
import { Router } from "@app/router";
import { VehicleController } from "./vehicle.controller";
import { FetchVehicleDto } from "./dto";
import { Validator } from "@utils/helpers";
import { VehicleListDto } from "./dto/vehicleList.dto";

const router = Router();

router.get("/", async (request: Request, response: Response): Promise<void> => {
  const controller = new VehicleController();
  const params = await Validator(VehicleListDto, request.query);

  const result = await controller.fetch(params);

  response.send(result);
});

router.get(
  "/:id",
  async (request: Request, response: Response): Promise<void> => {
    const controller = new VehicleController();
    const params = await Validator<FetchVehicleDto>(
      FetchVehicleDto,
      request.params
    );

    const result = await controller.fetchByIdOrFail(params.id);

    response.send(result);
  }
);

export default router;
