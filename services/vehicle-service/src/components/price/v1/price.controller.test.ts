import { NotFoundException } from '@app/exceptions';
import { PriceController } from './price.controller';

describe('fetch()', () => {
    test('Should return pricing information', async () => {
        const controller = new PriceController();

        const pricingPlans = await controller.fetch();

        for (let plan of pricingPlans) {
            expect(plan).toHaveProperty('name');
            expect(plan).toHaveProperty('price');
            expect(plan).toHaveProperty('plan_id');
        }
    });
});
describe('fetchById()', () => {
    test('Should return price by id', async () => {
        const controller = new PriceController();

        const plans = await controller.fetch();

        const result = await controller.fetchById(plans[0]!.plan_id);

        expect(result).toBeDefined();
    });

    test('Should return null if invalid id is passed', async () => {
        const controller = new PriceController();

        const result = await controller.fetchById('INVALID_ID');

        expect(result).toBeNull();
    });
});
describe('fetchByIdOrFail()', () => {
    test('Should return price by id', async () => {
        const controller = new PriceController();

        const plans = await controller.fetch();
        const result = await controller.fetchByIdOrFail(plans[0]!.plan_id);

        expect(result).toBeDefined();
    });

    test('Should throw if invalid id is passed', async () => {
        const controller = new PriceController();

        const result = controller.fetchByIdOrFail('INVALID_ID');

        await expect(result).rejects.toThrowError(NotFoundException);
    });
});