import { BadRequestException } from "./badRequest.exception";

test("Should have status", () => {
  const status = 400;
  const message = "BAD_REQUEST_ERROR";
  const data = { feel: "Not Feeling Well!" };

  try {
    throw new BadRequestException(message, data);
  } catch (error: any) {
    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
    expect(error.data).toBe(data);
  }
});
test("Should work without a data object", () => {
  const status = 400;
  const message = "BAD_REQUEST_ERROR";

  try {
    throw new BadRequestException(message);
  } catch (error: any) {
    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
  }
});
