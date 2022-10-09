import { NotFoundException } from "@app/exceptions";
import { VehicleController } from "./vehicle.controller";

describe('fetchById()', () => {
    test('Should return Bike', async () => {
        const controller = new VehicleController();
        const bikes = await controller.fetch({});
        const bikeId = <string> bikes[0]?.bike_id;

        const result = await controller.fetchById(bikeId);

        expect(result).toHaveProperty('bike_id');
        expect(result).toHaveProperty('vehicle_type_id');
        expect(result).toHaveProperty('lat');
        expect(result).toHaveProperty('lon');
    });

    test('Should return undefined if the given id is invalid', async () => {
        const controller = new VehicleController();

        const result = await controller.fetchById('INVALID');

        expect(result).toBeNull();
    });
});

describe('fetchByIdOrFail()', () => {
    jest.setTimeout(20000);

    test('Should return Bike', async () => {
        const controller = new VehicleController();

        const bikes = await controller.fetch({});
        const bikeId = <string> bikes[0]?.bike_id;
        const result = await controller.fetchByIdOrFail(bikeId);

        expect(result).toHaveProperty('bike_id');
        expect(result).toHaveProperty('vehicle_type_id');
        expect(result).toHaveProperty('lat');
        expect(result).toHaveProperty('lon');
    });

    test('Should throw NotFoundException if the given id is invalid', async () => {
        const controller = new VehicleController();

        const result = controller.fetchByIdOrFail('INVALID');

        await expect(result).rejects.toThrowError(NotFoundException);
    });
});