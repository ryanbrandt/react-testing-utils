/// <reference types="jest" />
declare type AnyFunction = (...args: any[]) => any;
declare class JestUtilities {
    static assertAsMockFunction: <T extends AnyFunction>(actual: T) => jest.MockedFunction<T>;
    static assertAsMockClass: <T extends jest.Constructable>(actual: T) => jest.MockedClass<T>;
}
export default JestUtilities;
