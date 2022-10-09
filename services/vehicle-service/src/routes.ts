import swaggerUi from "swagger-ui-express";
import { Application } from "@utils/types";
import swaggerDocument from './swagger.json';
import { FeedRouteV1 } from "@components/feed/v1";
import { PriceRouteV1 } from "@components/price/v1";
import { VehicleRoutesV1 } from "@components/bike/v1";

export const RegisterRoutes = (app: Application): void => {
  app.use('/v1/feed', FeedRouteV1);
  app.use('/v1/price', PriceRouteV1);
  app.use('/v1/vehicle', VehicleRoutesV1);
};

export const RegisterDocumentation = (app: Application): void => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );
}