// Keep the jest global types in the emitted declarations (TS 5.5+ no longer adds this).
/// <reference types="jest" preserve="true" />
type AnyFunction = (...args: any[]) => any;

/**
 * Type helpers for values mocked with `jest.mock()`
 *
 * Jest's built-in `jest.mocked()` is the equivalent of both helpers.
 */
class JestUtilities {
  /**
   * Types a function mocked by `jest.mock()` as a Jest mock function
   * @param actual The mocked function
   */
  static assertAsMockFunction = <T extends AnyFunction>(
    actual: T,
  ): jest.MockedFunction<T> => {
    const mockedFunction = actual as jest.MockedFunction<T>;

    return mockedFunction;
  };

  /**
   * Types a class mocked by `jest.mock()` as a Jest mock class
   * @param actual The mocked class
   */
  static assertAsMockClass = <T extends jest.Constructable>(
    actual: T,
  ): jest.MockedClass<T> => {
    const mockedClass = actual as jest.MockedClass<T>;

    return mockedClass;
  };
}

export default JestUtilities;
