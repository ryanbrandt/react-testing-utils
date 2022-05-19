type AnyFunction = (...args: any[]) => any;

class JestUtilities {
  static assertAsMockFunction = <T extends AnyFunction>(
    actual: T,
  ): jest.MockedFunction<T> => {
    const mockedFunction = actual as jest.MockedFunction<T>;

    return mockedFunction;
  };

  static assertAsMockClass = <T extends jest.Constructable>(
    actual: T,
  ): jest.MockedClass<T> => {
    const mockedClass = actual as jest.MockedClass<T>;

    return mockedClass;
  };
}

export default JestUtilities;
