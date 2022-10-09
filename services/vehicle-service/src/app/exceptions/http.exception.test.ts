import { HttpException } from "./http.exception";

test('Should have status', () => {
    const status = 500;
    const message = 'INTERNAl_SERVER_ERROR';
    const data = { feel: 'Not Feeling Well!' };

    try {
        throw new HttpException(message, status, data);
    } catch (error: any) {
        expect(error.status).toBe(status);
        expect(error.message).toBe(message);
        expect(error.data).toBe(data);
    }
});
test('Should work without a data object', () => {
    const status = 500;
    const message = 'INTERNAl_SERVER_ERROR';

    try {
        throw new HttpException(message);
    } catch (error: any) {
        expect(error.status).toBe(status);
        expect(error.message).toBe(message);
    }
});