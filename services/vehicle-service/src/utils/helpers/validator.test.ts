import { BadRequestException } from "@app/exceptions/badRequest.exception";
import { IsInt, IsString, Max, Min } from "class-validator";
import { Validator } from "./validator.helper";

class TestClassDto {
    @IsString()
    stringProperty: string;

    @IsInt()
    numericProperty: number;

    @IsInt()
    @Min(3)
    @Max(10)
    numberMin3Max10: number;
}

test('Should return the given object', async () => {
    const data = {
        stringProperty: 'TestString',
        numericProperty: 10,
        numberMin3Max10: 5,
    }

    const result = await Validator(TestClassDto, data);

    expect(result.stringProperty).toBe(data.stringProperty);
});

test('Should throw if signature does not match', async () => {
    const data = {
        stringProperty: 10,
        numericProperty: 'I must be an Integer',
        numberMin3Max10: 20,
    }

    const result = Validator(TestClassDto, data);

    await expect(result).rejects.toThrowError(BadRequestException);
});
test('Should throw if extra property has been passed', async () => {
    const data = {
        stringProperty: 'String',
        numericProperty: 20,
        numberMin3Max10: 5,
        whiteList: true,
    }

    const result = Validator(TestClassDto, data);

    await expect(result).rejects.toThrowError(BadRequestException);
});