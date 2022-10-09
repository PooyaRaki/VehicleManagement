import { NotFoundException } from "./notfound.exception";

test('Should have status', () => {
    const status = 404;
    const message = 'TEST_ERROR';
    const data = { feel: 'Not Feeling Well!' };

    try {
        throw new NotFoundException(message, data);
    } catch (error: any) {
        expect(error.status).toBe(status);
        expect(error.message).toBe(message);
        expect(error.data).toBe(data);
    }
});
test('Should work without a data object', () => {
    const status = 404;
    const message = 'TEST_ERROR';

    try {
        throw new NotFoundException(message);
    } catch (error: any) {
        expect(error.status).toBe(status);
        expect(error.message).toBe(message);
    }
});